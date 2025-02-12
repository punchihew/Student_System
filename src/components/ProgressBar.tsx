

interface ProgressBarProps {
    progress: number
}
const ProgressBar = ({ progress }: ProgressBarProps) => {

    const style = { // Style for the progress bar
        width: `${progress}%`
    }

    return (
        <div className="w-full h-2 bg-gray-200 rounded-full">
            <div style={style} className="h-full bg-[#ffc300] rounded-full transition-all duration-300 ease-in-out"></div>
        </div>
    )
}

export default ProgressBar