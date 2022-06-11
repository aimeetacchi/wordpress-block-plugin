import React from 'react';
import ReactDOM from 'react-dom'

import "./frontend.scss"

document.addEventListener("DOMContentLoaded", function(event) {
    const divsToUpdate = document.querySelectorAll(".myquizblock");

    divsToUpdate.forEach((div) => {
        const data = JSON.parse(div.querySelector("pre").innerHTML);
        ReactDOM.render(<Quiz {...data} />, div)
        div.classList.remove("quiz-block")
    })

    function Quiz({question, answers}) {
        return (
            <div className="quiz-frontend">
                <p>{question}</p>
                <ul>
                    {answers.map((answer) => {
                        return <li>{answer}</li>
                    })}
                </ul>
            </div>
        )
    }
})