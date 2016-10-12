const readline = require('readline');
const Immutable = require("immutable");
const { Map, List } = Immutable;

const topics = Immutable.fromJS(require('./bayesian.json'));

const model = topics
  .map((topic) => Map({ topic: topic }))
  .map((topic) => topic.set('score', 0))
  .map((topic) => topic.set('votes', 1))
  .map((topic) => topic.set('rating', 5));

function add_vote(topic, vote) {
  const { votes } = topic.toJS();

  return topic
    .update('rating', (rating) => rating + vote)
    .update('votes', (votes) => votes + 1);
}

function average_rating(topics) {
  const votes = count_votes(topics);

  const ratings = topics
    .map((topic) => topic.get('rating'))
    .reduce((x, acc) => x + acc, 0);

  if (votes === 0 && ratings === 0) {
    return 5;
  }

  return ratings / votes;
}

function count_votes(topics) {
  return topics
    .map((topic) => topic.get('votes'))
    .reduce((x, acc) => x + acc, 0);
}

function update_scores(topic, average, m) {
  const { votes, rating } = topic.toJS();

  return topic
    .set('score', rating / (m + votes) + m * average / (m + votes));
}

function select_topic(topics) {
  const max = topics
    .maxBy((hitter) => hitter.get('score'));

  const rest = topics
    .filterNot((topic) => topic == max);

  return [max].concat(rest);
}

function loop(topics, speak) {
  [ next_topic, ...rest ] = select_topic(topics);
  [ question, ...remaining_questions ] = next_topic.get('topic');
  
  speak(question)
    .done(() => {
      const answer = prompt(question);

      const topic = add_vote(next_topic, parseInt(answer, 10))
        .update('topic', (topic) => topic.shift().push(topic.first()));
      const model = List([topic])
        .concat(rest[0]);

      const avg = average_rating(model);

      const t = model
        .map((topic) => update_scores(topic, avg, 1))

      loop(t, speak);
    });
}

function format(topics) {
  return topics
    .map((topic) => ({
      topic: topic.get('topic').first(),
      score: topic.get('score'),
      rating: topic.get('rating')
    }))
    .toJS();
}

const avg = average_rating(model);

const t = model
  .map((topic) => update_scores(topic, avg, 1))

module.exports = {
  loop: (f) => loop(t, f)
};
