import QuestionsOpt from "@/components/QuestionsOpt"

const page = () => {
    const questions =[
        {
          "question": "What is the capital of France?",
          "options": ["Paris", "Berlin", "Madrid", "Rome"],
          "correctAns": "Paris",
          "cataroies": "Geography"
        },
        {
          "question": "Which programming language is primarily used for web development?",
          "options": ["Python", "Java", "JavaScript", "C++"],
          "correctAns": "JavaScript",
          "cataroies": "Programming"
        },
        {
          "question": "What is 5 + 3?",
          "options": ["5", "8", "10", "12"],
          "correctAns": "8",
          "cataroies": "Mathematics"
        }
      ]
    return (
        <div className='p-6'>
         <QuestionsOpt  questions={questions}/>
        </div>
    )
}

export default page
