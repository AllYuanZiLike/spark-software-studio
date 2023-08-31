import './daily.less'
// import './domLoading'
const {withRouter} = require('react-router-dom')

function Daily(){
    return(
        <div className="box">
            <div className='pic1' tabIndex={1}>
                <h1>学习时</h1>
            </div>
            <div className='pic2' tabIndex={1}>
                <h1>开会时</h1>
            </div>
            <div className='pic3' tabIndex={1}>
                <h1>运动时</h1>
            </div>
            <div className='pic4' tabIndex={1}>
                <h1>团建时</h1>
            </div>
            <div className='pic5' tabIndex={1}>
                <h1>娱乐时</h1>
            </div>
        </div>
    )
}

export default withRouter(Daily)
