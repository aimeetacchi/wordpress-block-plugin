import "./index.scss"
import { TextControl, Flex, FlexBlock, FlexItem, Button, Icon } from "@wordpress/components"

(function() {
    let locked = false;

    wp.data.subscribe(function() {
        const results = wp.data.select("core/block-editor").getBlocks().filter(function(block) {
            return block.name == "ourplugin/aimee-22-plugin" && block.attributes.correctAnswer == undefined
        })

        if(results.length && locked == false) {
            locked = true
            wp.data.dispatch("core/editor").lockPostSaving("noanswer")
        }
        if(!results.length && locked) {
            locked = false
            wp.data.dispatch("core/editor").unlockPostSaving("noanswer")
        }
    })
})()

wp.blocks.registerBlockType("ourplugin/aimee-22-plugin", {
    title: "Aimee 2022 Plugin",
    icon: "smiley",
    category: "common",
    attributes: {
        question: { type: "string"},
        answers: { type: "array", default: ["",]},
        correctAnswer: {type: "number", default: undefined}
    },
    edit: EditComponent,
    save: (props) => {
        return null
    },
})

function EditComponent (props) {

    const updateQuestion = (value) => {
        props.setAttributes({question: value})
    }

    const deleteAnswer = (indexToDelete) => {
        const newAnswers = props.attributes.answers.filter((answer, index) => index !== indexToDelete)
        props.setAttributes({answers: newAnswers})
        if(indexToDelete == props.attributes.correctAnswer) {
            props.setAttributes({correctAnswer: undefined })
        }
    }

    const markAsCorrect = (index) => {
        props.setAttributes({correctAnswer: index});
    }

    return (
        <div className="plugin-edit-block">
            <TextControl onChange={updateQuestion} label="Question:" value={props.attributes.question} style={{fontSize: '24px'}} />
            <p style={{fontSize: '13px', margin: "20px 0 8px"}}>Answers</p>

           {props.attributes.answers.map((answer, index) => {
               return (
                    <Flex>
                        <FlexBlock>
                            <TextControl autoFocus={answer == undefined} value={answer} onChange={newValue => {
                                const newAnswers = [...props.attributes.answers]
                                newAnswers[index] = newValue
                                props.setAttributes({answers: newAnswers})
                            }} />
                        </FlexBlock>
                        <FlexItem>
                            <Button onClick={() => markAsCorrect(index)}>
                                <Icon className="mark-as-correct" icon={props.attributes.correctAnswer == index ? "star-filled" : "star-empty"}/>
                            </Button>
                        </FlexItem>
                        <FlexItem>
                            <Button onClick={() => deleteAnswer(index)} isLink className="deleteBtn">Delete</Button>
                        </FlexItem>
                    </Flex>
               )
           })}
            <Button onClick={() => {
                props.setAttributes({answers: [...props.attributes.answers, undefined]})
            }} isPrimary>Add another answer</Button>
        </div>
    )
}