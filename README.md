# Note Taker

[![License: MIT](https://img.shields.io/badge/License-MIT-purple.svg)](https://opensource.org/licenses/MIT)

## Bootcamp Week 11 Challenge
This week's challenge was to modify starter code for a note taking application that uses Express.js on the back end and stores and retrieves data from a JSON file. The requirements were the following:

1. Build the back end of the application (front end already exists), connect the two, and deploy to Heroku.
2. The clickable link on the landing page should take you to the note taking page.
3. After entering a note title and text and hitting the save button, the note should appear on the left side in a list and the title and text fields should be cleared for a new note.
4. If the user clicks on an existing note in the left-hand list, the title and text should appear in the main note field for viewing, but then when clicking on the add note icon, the main field will be cleared and ready for a new note.
5. *Bonus Task:* When the user clicks on the garbage can icon next to an existing note in the note list, it deletes the note.


## Table of Contents
1. [Installation](#installation)
2. [Usage](#usage)
3. [Process Highligts](#process-highlights)
4. [License](#license)
5. [Contributing](#contributing)
6. [Questions](#questions)

## Installation
This app requires Node.js, npm, Express.js, and Heroku.

## Usage
1. Click the "Get Started" link on the home page to get to the note taking page.
2. Enter a note title and descriptive text and hit the save icon in the upper-right hand corner. Both a title and text are required; the save icon will not appear until both are entered.
3. After saving the note, it will appear in a list on the left-hand side. You can click on the note title to view it again in the main area.
4. If you are viewing an existing note in the main area, you can click the plus icon in the upper right hand corner to exit out of the note and add a new one.
5. To delete a note, click the trash can to the right of an existing note in the list.

![Screenshot 2023-03-01 at 5 10 46 PM](https://user-images.githubusercontent.com/117301473/222289553-823618f0-1009-4f50-ae4b-b08b71936f57.png)

![Screenshot 2023-03-01 at 5 29 51 PM](https://user-images.githubusercontent.com/117301473/222290310-e6c3d579-f470-4f6f-9d61-fc39808c04a5.png)


[*LINK TO DEPLOYED APPLICATION AT HEROKU*](https://note-taker-srichens.herokuapp.com/)

## Process Highlights
1. Because the front end was already built and that code didn't need to be modified at all, it was pretty straightforward to add in Express on the back end. 

2. *Challenges:* The biggest challenge was reading and writing the JSON file so that it could interact properly with the front end javascript. The first hurdle was reading the file and parsing it to a javascript array so that the new note could be added to the array and then the new array written back to the JSON file. However, when I finally successfully added the new array back to the JSON file, it did not show up on the webpage. The asynchronous fs.read/write methods were the problem. I would have to nest callback functions to return the data in the proper order, something I've done in previous homework assignments, but not to this extent. There was a lot of reading and writing and callbacking that needed to be done to make it all work. I put that process on hold and decided to add the modular routing (I started everything on the main js rather than starting with modular routing, since that is the process we took as we worked through the class assignments). When I looked back to the class work, I found perfect code for the situation in the tip jar example. The initial get request used the util.promisify for fs.readfile, so that the file could be read THEN turned into a javascript object THEN returned as a response to the front end. For the post request, since that was even more complicated, it had a function that used the fs.readfile with an fs.writeFile as a callback, and then the response sent back to the front end was the callback for that function. And all of the read/write file functions were in there own file. At first, I thought that would be unnecessary, since the class example had two routes and this one only had one, but it's still neater, even if I'm not rewriting any code.

3. *Successes:* It turned out the separate file for the file reading/writing really did make sense when I took on the bonus challenge of deleting notes. The delete note bonus was really fun to figure out. When I got it working, it was kind of messy redundant code, and it didn't make good use of the fs file. My goal was to use the fs file and not rewrite any code (or have to require fs on the notes.js file), and I eventually got it to work with promise chaining (and the hours I spent studying the code from class). I also researched and found the findIndex method, which is what I needed to tie the selected ID to the full note for deletion. I used the util.promisify function TWICE in the delete request, which was great, since it almost seemed silly to have it in a separate file up until then. 

## License
This product is licensed under MIT.

## Contributing
If you would like to contribute to this application, please refer to the [Contributor Covenant](https://www.contributor-covenant.org/).

## Questions
If you have any questions, please contact me at sarahgrichens@gmail.com or view my projects at https://github.com/srichens.