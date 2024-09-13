import Header from './Header'

function Section({ name, count, color}) {
    return (
        <div className="w-72 bg-gray-700 h-full">
            <Header 
                name = {name}
                count = {count}
                color = {color}
            />
            {/* <Cards /> */}
        </div>
    )
}

export default Section