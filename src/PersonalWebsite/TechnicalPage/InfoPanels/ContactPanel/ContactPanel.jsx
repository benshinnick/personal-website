import React from 'react';
import './ContactPanel.css';
import ConnectPanel from '../../../HomePage/InfoPanels/ConnectPanel/ConnectPanel';

export default class ContactPanel extends React.Component {

    fallbackCopyTextToClipboard(text) {
        var textArea = document.createElement("textarea");
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
      
        try {
          var successful = document.execCommand("copy");
          var msg = successful ? "successful" : "unsuccessful";
          console.log("Fallback: Copying text command was " + msg);
        } catch (err) {
          console.error("Fallback: Oops, unable to copy", err);
        }
      
        document.body.removeChild(textArea);
      }
      
      // https://stackoverflow.com/questions/400212/how-do-i-copy-to-the-clipboard-in-javascript
      copyTextToClipboard(text) {
        if (!navigator.clipboard) {
          this.fallbackCopyTextToClipboard(text);
          return;
        }
        navigator.clipboard.writeText(text).then(
          function() {
            console.log("Async: Copying to clipboard was successful!");
          },
          function(err) {
            console.error("Async: Could not copy text: ", err);
          }
        );

          document.getElementById('email-text').textContent = "Copied!"
          setTimeout(() => {
            document.getElementById('email-text').textContent = "shinnickbenjamin@gmail!"
          }, 1000)
      }

    render() {
        return (
            <div className='info-panel-content' id='contact-panel-content'>
                <hr></hr>
                <div id='panel-text'>
                    I would be happy to further discuss my experiences with you, simply shoot me an email or message me on LinkedIn!
                </div>
                <hr></hr>
                <div id='email-line'>
                    <div className='email-icons'>E F N</div>
                    <div id='email-text' onClick={() => { this.copyTextToClipboard('shinnickbenjamin@gmail') }}>shinnickbenjamin@gmail</div>
                    <div className='email-icons'>a s 5</div>
                </div>
                <hr></hr>
                <ConnectPanel />
                <hr></hr>
            </div>
        );
    }
}