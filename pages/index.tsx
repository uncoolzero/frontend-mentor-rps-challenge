import { useEffect, useState } from 'react'
import Button from '../components/Button'

const Home = () => {

  const options = ["rock", "paper", "scissors"]
  
  const defaultRockPos = "absolute ml-[5.25rem] mt-[7rem] 1xl:mt-[8rem] 1xl:ml-[3.5rem] 1xl:scale-[150%] transition-all ease-in-out"
  const defaultPaperPos = "absolute ml-0 -mt-10 1xl:-ml-[5rem] 1xl:-mt-[7rem] 1xl:scale-[150%] transition-all ease-in-out"
  const defaultScissorsPos = "absolute ml-[10.5rem] -mt-10 1xl:ml-[12.5rem] 1xl:-mt-[7rem] 1xl:scale-[150%] transition-all ease-in-out"
  const defaultEmptyButtonPos = "hidden absolute ml-[10.5rem] -mt-10 1xl:scale-[150%] transition-all ease-in-out"

  const defaultHouseSelectButtonPos = "hidden absolute ml-[10.5rem] -mt-10 1xl:scale-[150%] transition-all ease-in-out"

  const defaultTrianglePos = "ml-[2rem] z-1"

  const showdownScreenPlayerSelectPos = "absolute -ml-2 -mt-10 1xl:-ml-[20rem] transition-all 1xl:scale-250 ease-in-out"
  const showdownScreenHouseSelectPos = "absolute ml-[11rem] -mt-10 1xl:ml-[21rem] transition-all 1xl:scale-250 ease-in-out"

  const defaultYouPickedTextVis = "text-white absolute z-[90] mt-[7rem] ml-[0.75rem] 1xl:-mt-[6rem] 1xl:-ml-[15rem] 1xl:text-2xl tracking-widest"
  const defaultHousePickedTextVis = "text-white absolute z-[90] mt-[7rem] ml-[10.5rem]  1xl:-mt-[6rem] 1xl:ml-[24rem] 1xl:text-2xl tracking-widest whitespace-nowrap"

  const defaultResultBoxVis = "hidden"
  const defaultResultBoxText = "YOU WIN"
  
  const defaultCircleScales = ["scale-[0%]", "scale-[0%]", "scale-[0%]", "scale-[0%]", "scale-[0%]", "scale-[0%]"]
  const winCircleScales = ["scale-[90%]", "scale-[100%]", "scale-[110%]", "scale-[0%]", "scale-[0%]", "scale-[0%]"]
  const loseCircleScales = ["scale-[0%]", "scale-[0%]", "scale-[0%]", "scale-[90%]", "scale-[100%]", "scale-[110%]"]

  const [showRules, setShowRules] = useState(false)
  const [phase, setPhase] = useState(1)
  const [score, setScore] = useState(0)

  const [rockButtonPos, setRockButtonPos] = useState(defaultRockPos)
  const [paperButtonPos, setPaperButtonPos] = useState(defaultPaperPos)
  const [scissorsButtonPos, setScissorsButtonPos] = useState(defaultScissorsPos)
  const [emptyButtonPos, setEmptyButtonPos] = useState(defaultEmptyButtonPos)
  const [trianglePos, setTrianglePos] = useState(defaultTrianglePos)
  const [houseSelectButtonPos, setHouseSelectButtonPos] = useState(defaultHouseSelectButtonPos)

  const [youPickedTextVis, setYouPickedTextVis] = useState(defaultYouPickedTextVis)
  const [housePickedTextVis, setHousePickedTextVis] = useState(defaultHousePickedTextVis)

  const [resultBoxVis, setResultBoxVis] = useState(defaultResultBoxVis)
  const [resultBoxText, setResultBoxText] = useState(defaultResultBoxText)

  const [circleScales, setCircleScales] = useState(defaultCircleScales)

  const [playerSelection, setPlayerSelection] = useState("")
  const [houseSelection, setHouseSelection] = useState("")
  const [rulesModalStyle, setRulesModalStyle] = useState("hidden")

  useEffect(() => {

    if (showRules == true)
    {
      setRulesModalStyle("absolute font-custom h-full w-full bg-white 1xl:bg-black/50 z-[90]")
    }
    else
    {
      setRulesModalStyle("hidden")
    }

  }, [showRules])

  useEffect(() => {
    
    if (playerSelection !== "")
    {
      var randomPick = Math.floor(Math.random() * 3)
      setHouseSelection(options[randomPick])
      setPhase(2)
    }

  }, [playerSelection]) 

  useEffect(() => {
    
    if (phase == 1)
    {
      setPlayerSelection("")
      setCircleScales(defaultCircleScales)
      setTrianglePos(defaultTrianglePos)
      setYouPickedTextVis("hidden")
      setHousePickedTextVis("hidden")
      setResultBoxVis("hidden")
      setRockButtonPos(defaultRockPos)
      setPaperButtonPos(defaultPaperPos)
      setScissorsButtonPos(defaultScissorsPos)
      setEmptyButtonPos(defaultEmptyButtonPos)
      setHouseSelectButtonPos(defaultHouseSelectButtonPos)
    }
    else if (phase == 2)
    {

      setTrianglePos("invisible ml-[2rem]")

      if (playerSelection == "rock")
      {
        setRockButtonPos(showdownScreenPlayerSelectPos)
        setPaperButtonPos("hidden")
        setScissorsButtonPos("hidden")
      }
      else if (playerSelection == "paper")
      {
        setRockButtonPos("hidden")
        setPaperButtonPos(showdownScreenPlayerSelectPos)
        setScissorsButtonPos("hidden")
      }
      else if (playerSelection == "scissors")
      {
        setRockButtonPos("hidden")
        setPaperButtonPos("hidden")
        setScissorsButtonPos(showdownScreenPlayerSelectPos)
      }

      setEmptyButtonPos(showdownScreenHouseSelectPos)
      setHousePickedTextVis(defaultHousePickedTextVis)
      setYouPickedTextVis(defaultYouPickedTextVis)

      const timer = setTimeout(() => setPhase(3), 500)
      return () => clearTimeout(timer)
    }
    else if (phase == 3)
    {
      setHouseSelectButtonPos(showdownScreenHouseSelectPos)

      const timer = setTimeout(() => setPhase(4), 500)
      return () => clearTimeout(timer)
    }
    else if (phase == 4)
    {

      if (playerSelection === "rock")
      {
        switch (houseSelection) {
          case "rock":
            draw()
            break;
          case "paper":
            defeat()
            break;
          case "scissors":
            victory()
            break;
        }
      }
      else if (playerSelection === "paper")
      {
        switch (houseSelection) {
          case "rock":
            victory()
            break;
          case "paper":
            draw()
            break;
          case "scissors":
            defeat()
            break;
        }
      }
      else if (playerSelection === "scissors")
      {
        switch (houseSelection) {
          case "rock":
            defeat()
            break;
          case "paper":
            victory()
            break;
          case "scissors":
            draw()
            break;
        }
      }

    }


  }, [phase])

  function victory() {
    setScore(score + 1)
    setResultBoxText("YOU WIN")
    setResultBoxVis("flex")
    setCircleScales(winCircleScales)
  }

  function defeat() {
    setScore(score - 1)
    setResultBoxText("YOU LOSE")
    setResultBoxVis("flex")
    setCircleScales(loseCircleScales)
  }

  function draw() {
    setResultBoxText("DRAW")
    setResultBoxVis("flex")
    setCircleScales(defaultCircleScales)
  }

  return (
    
    <div>

      <div className={rulesModalStyle}>
        <div className="px-8 py-4 flex flex-col 1xl:absolute 1xl:right-[40vw] 1xl:top-[23vh] gap-y-[6.25rem]">
          <div className="flex justify-center 1xl:absolute 1xl:pt-4 1xl:pl-6 1xl:text-2xl pt-[4rem] text-lg font-bold text-[#3b4363]">
              RULES
          </div>
          <div className="flex justify-center">
              <div className="bg-white 1xl:px-8 1xl:pt-16 1xl:pb-6 1xl:rounded-lg">
                <img src="/image-rules.svg" />
              </div>
          </div>
          <div className="flex justify-center 1xl:absolute 1xl:pt-6 1xl:right-16">
              <button onClick={() => setShowRules(false)}>
                <img src="/icon-close.svg" />
              </button>
          </div>
        </div>
      </div>

      <div className="h-screen font-custom bg-gradient-radial from-[#1f3756] to-[#141539] py-8 px-8 space-y-24 min-w-[360px] 1xl:min-w-[1280px]">

        <div className="flex flex-col grow h-[90vh]">

          <div className="flex justify-center basis-28">
            {/*Header*/}
            <div className="border-[#606e85] border-2 rounded-lg 1xl:rounded-xl flex justify-between h-[6.25rem] min-w-[320px] max-w-[720px] px-2 1xl:min-w-[720px] 1xl:h-[10rem]">  
                <img src="/logo.svg" width={90} height={50} className="place-self-center pl-2 1xl:ml-12 1xl:scale-[200%]"/>
                
                <div />

                <div className="bg-white rounded-lg w-[5rem] h-[5rem] 1xl:w-[7rem] 1xl:h-[7rem] 1xl:mr-4 place-self-center">
                  <div className="flex flex-col">
                    <div className="flex justify-center text-xs pt-2 1xl:pt-4 1xl:text-sm tracking-widest text-[#2a46c0]">
                    SCORE
                    </div>
                    <div className="flex justify-center text-4xl 1xl:text-6xl text-[#3b4363] font-bold">
                    {score}
                    </div>
                  </div>
                </div>
            </div>
          </div>

          <div className="flex justify-center basis-10/12">
            <div className="flex items-center justify-center -ml-[2.1rem] 1xl:pt-14 1xl:scale-90">
              {/*RPS*/}
              <div>
                  <div onClick={() => setPlayerSelection("paper")} className={`${paperButtonPos} z-[10]`}>
                      <Button type="paper" playerButton={true} auxColor="paper-dark"/>
                  </div>

                  <div onClick={() => setPlayerSelection("scissors")} className={`${scissorsButtonPos} z-[10]`}>
                      <Button type="scissors" playerButton={true} auxColor="scissors-dark"/>
                  </div>

                  <div onClick={() => setPlayerSelection("rock")} className={`${rockButtonPos} z-[10]`}>
                      <Button type="rock" playerButton={true} auxColor="rock-dark"/>
                  </div>

                  <div className={`${houseSelectButtonPos} z-[10]`}>
                      <Button type={houseSelection} playerButton={false} auxColor={`${houseSelection}-dark`}/>
                  </div>

                  <div className={`${emptyButtonPos}`}>
                    <div className="absolute rounded-full w-[8rem] h-[8rem] bg-[#182842]"/>
                  </div>

                  <div className={youPickedTextVis}>
                  YOU PICKED
                  </div>

                  <div className={housePickedTextVis}>
                  THE HOUSE PICKED
                  </div>

                  {/* WIN/DEFEAT CIRCLE */}
                
                  <div className={`${showdownScreenPlayerSelectPos}`}>
                    <div className="relative">
                      <div className={`absolute -ml-[1rem] ${circleScales[0]} -mt-[1rem] bg-white/5 w-[10rem] h-[10rem] transition-all ease-in-out rounded-full z-[5]`}/>
                      <div className={`absolute -ml-[1rem] ${circleScales[1]} -mt-[1rem] bg-white/5 w-[10rem] h-[10rem] transition-all ease-in-out rounded-full z-[4]`}/>
                      <div className={`absolute -ml-[1rem] ${circleScales[2]} -mt-[1rem] bg-white/5 w-[10rem] h-[10rem] transition-all ease-in-out rounded-full z-[3]`}/>
                    </div>
                  </div>
                  
                  <div className={`${showdownScreenHouseSelectPos}`}>
                    <div className="relative">
                      <div className={`absolute -ml-[1rem] ${circleScales[3]} -mt-[1rem] bg-white/5 w-[10rem] h-[10rem] transition-all ease-in-out rounded-full z-[5]`}/>
                      <div className={`absolute -ml-[1rem] ${circleScales[4]} -mt-[1rem] bg-white/5 w-[10rem] h-[10rem] transition-all ease-in-out rounded-full z-[4]`}/>
                      <div className={`absolute -ml-[1rem] ${circleScales[5]} -mt-[1rem] bg-white/5 w-[10rem] h-[10rem] transition-all ease-in-out rounded-full z-[3]`}/>
                    </div>
                  </div>

                  {/* WIN/DEFEAT CIRCLES */}

                  <div className={`${trianglePos} 1xl:scale-[125%]`}>
                      <img src="/bg-triangle.svg" width={230} height={230} />
                  </div> 
              </div>
            </div>
          </div>

          <div className={`${resultBoxVis} justify-center transition-all ease-in-out -mt-[8.75rem] 1xl:absolute 1xl:top-[70vh] 1xl:left-[44.5vw] pb-4 text-white`}>
            <div className="w-[14rem]">

                <div className="text-[55px] flex justify-center">{resultBoxText}</div>

                <div onClick={() => setPhase(1)}className="border border-white cursor-pointer hover:bg-neutral-300 active:bg-neutral-500 bg-white text-[#3b4363] px-2 py-2 rounded-lg flex justify-center tracking-[0.2em]">
                PLAY AGAIN
                </div>

            </div>
          </div>

          <div className="basis-10">
            <div className="flex justify-center"> 
              <button onClick={() => setShowRules(true)} className="border-2 rounded-lg border-white hover:bg-white hover:text-black transition-all active:bg-neutral-400 active:border-neutral-400 text-white tracking-widest 1xl:absolute 1xl:right-6 1xl:bottom-6 px-8 py-2">
              RULES  
              </button>
            </div>
          </div>

        </div>
        
      </div>

    </div>
  )
}

export default Home
