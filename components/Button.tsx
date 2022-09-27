import Image from "next/image"

interface Props {
    type: string
    auxColor: string
    playerButton: boolean
}

function Button({type, auxColor, playerButton}: Props) {

if (playerButton == true)
{
  return (
    <div className="group cursor-pointer">
        <div className="absolute rounded-full w-[6rem] h-[6rem] bg-neutral-300 z-50 mt-[1rem] transition-all group-active:mt-[1.25rem] mx-4" />
        <div className="absolute rounded-full w-[6rem] h-[5.75rem] bg-white z-50 mt-[1.25rem] transition-all group-active:mt-[1.50rem] mx-4">
            <div className="pl-[1.4rem] pt-5">
                <Image src={`/icon-${type}.svg`} height="50" width="50"/>
            </div>
        </div>
        <div className={`absolute rounded-full w-[8rem] h-[8rem] transition-all group-active:mt-[0.25rem] ${type} z-40`} />
        <div className={`absolute rounded-full w-[8rem] h-[7.75rem] mt-[0.5rem] ${auxColor}`} />
    </div>
  )

}
else
{
  return (
    <div className="">
        <div className="absolute rounded-full w-[6rem] h-[6rem] bg-neutral-300 z-50 mt-[1rem] transition-all mx-4" />
        <div className="absolute rounded-full w-[6rem] h-[5.75rem] bg-white z-50 mt-[1.25rem] transition-all mx-4">
            <div className="pl-[1.4rem] pt-5">
                <Image src={`/icon-${type}.svg`} height="50" width="50"/>
            </div>
        </div>
        <div className={`absolute rounded-full w-[8rem] h-[8rem] transition-all ${type} z-40`} />
        <div className={`absolute rounded-full w-[8rem] h-[7.75rem] mt-[0.5rem] ${auxColor}`} />
    </div>
  )

}

}



export default Button