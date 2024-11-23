import ScoreCards from "@/components/Cards/ScoreCards";
import ResultQuestions from "@/components/ResultQuestions";

export default function page(){
    const catagory = [
        { category: "Math", score: 9, correctCount: 1, wrongCount: 1 },
        { category: "Science", score: 1, correctCount: 0, wrongCount: 1 }
      ]
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
      const selectedIndexes = {
        0: 0,
        1: 2,
        2: 3,
        3: 1
      }
      
    return (
        <div className='p-6'>
         <div className="score-card">
            <ScoreCards overAllScore={4} catagoryScore={catagory} />
         </div>
         <div className="questions">
            <ResultQuestions answeredQuestion={questions} selectedArrays={selectedIndexes} />
         </div>
        </div>
    )
}