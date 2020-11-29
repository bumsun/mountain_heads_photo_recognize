import React from 'react';

class Work extends React.Component {
    constructor(props){
        super(props)
             
        
    }
   
    render() {
        var univercity = ""
        var work = ""
        var stage = 0
        if (this.props.info.vkInfo != undefined){
            univercity = this.props.info.vkInfo.university_name
            if (this.props.info.vkInfo.career != undefined){
                var career = this.props.info.vkInfo.career
                if (career.lenght > 0){
                    work = career[career.lenght - 1].company
                    stage = 2020 - career[0].from
                }
            }
            
        }
        return (
                            <div>
                                <p className="personal_title">Трудовой статус</p>
                                <div className="right_info">
                                    <p className="info_cont_title">Работа</p>
                                    <p className="text_info_cont_left left_m_16">{work == "" ? "не указано" : work}</p>
                                    {work != "" && <p className="text_info_cont m_info_text">Явно указано Вк</p>}

                                    <p className="info_cont_title top_m_32_info">Стаж</p>
                                    <div className="info_algoritm_dates info_white">
                                        <p className="text_info_cont_left">{stage == 0 ? "0 или не указано" : stage}</p>
                                        {stage > 0 && <p className="text_info_cont">вычислено алгоритмом</p>}
                                    </div>

                                    {/* <p className="info_cont_title top_m_32_info">Место работы</p>
                                    <p className="text_info_cont_left left_m_16">{work == "" ? "не указано" : work}</p>
                                    <p className="text_info_cont m_info_text">Явно указано Вк</p> */}

                                    {/* <p className="info_cont_title top_m_32_info">Уровень дохода</p>
                                    <p className="text_info_cont_left left_m_16">Выше 100 тыс. руб.</p>
                                    <p className="text_info_cont m_info_text">вычислено алгоритмом</p> */}

                                    <p className="info_cont_title top_m_32_info">Образование</p>
                                    <p className="text_info_cont_left left_m_16">{univercity == "" ? "не найдено" : univercity}</p>
                                    {univercity != "" && <p className="text_info_cont m_info_text">Явно указано Вк</p>}
                                </div>
                            </div>
           
        );
    }
}
export default Work;

