# Required tools

You need to install Node and Python.

# Before Using

Make sure you hit the app with an `npm install` in order to get all of the dependencies.

# Using the applications

Make sure you have browserify installed by running `npm install -g browserify`, then build the project by running `npm run build`. Then, start the server by running `node server.js`, and open http://localhost:4000/ in your browser. If you use the BCI reader, you'll need to give python sudo permission. Just enter your password in the terminal when you're told. Not happy about that, but that's what Emotiv wants you to do. Output from the BCI is appended to the file called output.

# If you're not using Linux

Have fun. You probably have to mess with the code in `insight/read.py` a bit.
