import './footer.less'

function Footer(){
    return(
        <div className='footer-main'>
            <div className="left">
                <div className="top">
                    <div className="top-left">
                        <img src={require('../../assets/footer/hist-logo.png')} alt=""/>
                    </div>
                    <div className="top-right">
                        <img src={require('../../assets/footer/hist-logoText.png')} alt=""/>
                    </div>
                </div>
                <div className="bottom">
                    <div className="bottom-left">
                        <img src={require('../../assets/footer/spark-logo-white.png')} alt=""/>
                    </div>
                    <div className="bottom-right">
                        <img src={require('../../assets/footer/spark-logo-text.png')} alt=""/>
                    </div>
                </div>
            </div>
            <div className="right">
                工信部备案：豫ICP备00000000号-1<br/>
                豫公网安备：41000000000000号<br/>
                XXXXXX © 2023 河南科技学院星火软件实验室<br/>

                联系方式：xxxxxxxxx
            </div>
        </div>
    )
}
export default Footer
