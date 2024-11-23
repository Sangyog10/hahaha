
const ScoreCards = ({overAllScore,catagoryScore}) => {
  return (
    <div className="">
      <h2 className="text-center">Score Card</h2>
      <div className="prints">
        <div className="flex justify-normal gap-2">
            <button className="btn">Export to excel</button>
            <button className="btn">Print</button>

            </div>
      </div>
      <div className="p-4">
        <div className="flex justify-normal">
          <p>Over All Score :</p>
          <p className="px-4">{overAllScore}</p>
        </div>
        <div className="grid grid-cols-6 place-items-center">
          <p>Category</p>
          <p>Score</p>
          <p className="text-red-400">Wrong Ans</p>
          <p className="text-green-500">Correct Ans</p>
          <p>Percentage</p>
          <p>Remarks:</p>
        </div>
        {catagoryScore.map((item, i) => (
          <div className="grid grid-cols-6 grid-flow-col place-items-center" key={i}>
            <p>{item.category}</p>
            <p>{item.score}</p>
            <p className="text-red-400">{item.wrongCount}</p>
            <p className="text-green-500">{item.correctCount}</p>
            <p className={`${((item.score / 10) * 100)<=60?'text-red-500':'text-green-600'}`}>{(item.score / 10) * 100}%</p>
          </div>
        ))}
      </div>
      
    </div>
  )
}

export default ScoreCards
