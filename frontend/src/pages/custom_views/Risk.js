import React from 'react';

class Risk extends React.Component {
    constructor(props){
        super(props)
             
        
    }
   
    render() {
        var isInFssp = false
        var isTerrorist = false
        if (this.props.info.responseSSP != undefined && this.props.info.responseSSP.lenght > 0){
            isInFssp = true
        }
        if (this.props.info.isTerrorist != undefined && this.props.info.isTerrorist != 0){
            isTerrorist = true
        }
        return (
                            <div>
                                <p className="personal_title top_m_32_info">Риски</p>
                                <div className="right_info">
                                    <p className="info_cont_title">ФССП</p>
                                    <p className="text_info_cont_left left_m_16">{isInFssp ? "Обнаружены судебные производства" : "Нет"}</p>
                                    <p className="text_info_cont m_info_text">вычислено алгоритмом</p>

                                    {/* <p className="info_cont_title top_m_32_info">Банкротсва по физ. лицам</p>
                                    <div className="info_algoritm_dates info_white">
                                        <p className="text_info_cont_left">Нет</p>
                                        <p className="text_info_cont">вычислено алгоритмом</p>
                                    </div> */}

                                    <p className="info_cont_title top_m_32_info">Список террористов и экстремистов</p>
                                    <p className="text_info_cont_left left_m_16">{isTerrorist ? "Обнаружен в списке Росфинмониторинга" : "Нет"}</p>
                                    <p className="text_info_cont m_info_text">вычислено алгоритмом</p>

                                    {/* <p className="info_cont_title top_m_32_info">Арбитражные дела по физ. лицам		</p>
                                    <p className="text_info_cont_left left_m_16">Нет</p>
                                    <p className="text_info_cont m_info_text">вычислено алгоритмом</p> */}
                                </div>
                            </div>
           
        );
    }
}
export default Risk;

