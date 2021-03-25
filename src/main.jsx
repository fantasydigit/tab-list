// make sure to import the react plugin toolkit first as it contains compatibility shims

const React = require("react");
const ReactDOM = require("react-dom");
const commands = require('commands')

let MainForm = require("./MainForm.jsx");

// const { positions, Provider } = require("react-alert");
// const AlertTemplate = require("react-alert-template-basic");
// const options = {
//     timeout: 5000,
//     position: positions.BOTTOM_CENTER
// };


let dialog;
// function getDialog() {
//     if (dialog == null) {
//         dialog = document.createElement("dialog");
//         ReactDOM.render(
//         <Provider template={AlertTemplate} {...options}>
//             <MainForm dialog={dialog} />
//         </Provider>    
//         ,dialog);
//     }
//     return dialog
// }
function getDialog() {
    if (dialog == null) {
        dialog = document.createElement("dialog");
        ReactDOM.render(<MainForm dialog={dialog} /> ,dialog);
    }
    return dialog
}

module.exports = {
    commands: {
        // menuCommand: function () {
        //     return new Promise((resolve, reject) => {
        //         let aDialog = document.body.appendChild(getDialog());
        //         aDialog.showModal();
        //         let closeButton = document.getElementById("closeButton");
        //         //console.log(closeButton);
        //         closeButton.onclick = function() {
        //             console.log("CCCCCCCCCCClicked~!!!");
        //             aDialog.close();
        //             resolve();
        //         }
        //     });
        // }

        menuCommand: async () => {
            await document.body.appendChild(getDialog()).showModal(); // async await very important
        }

        // menuCommand: async (selection, documentRoot) => {
        //     await getDialog(selection, documentRoot).showModal(); // async await very important
        // }

        //menuCommand: copySvgCode
    }
};

