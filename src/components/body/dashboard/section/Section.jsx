import Header from './Header'

function Section({ name, count, headerColor, bgColor}) {
    return (
        <div className="w-72 h-full" style={{backgroundColor : bgColor}}>
            <Header 
                name = {name}
                count = {count}
                color = {headerColor}
            />
            {/* <Cards /> */}
        </div>
    )
}

export default Section