import React from 'react';
import { getRelation, hasChildren } from '../../utils/Utils';

class Social extends React.Component {
    constructor(props){
        super(props)
             
        
    }
   
    render() {
        var age = 0
        var relation = "не указано"
        if (this.props.info.vkInfo){
            getRelation(this.props.info.vkInfo.relation)
        }
        var hasChild = false
        if (this.props.labels != undefined){
            hasChild = hasChildren(this.props.labels.convertedLandmarks)
        }
        return (
                            <div>
                                <p className="personal_title">Социальное положение</p>
                                <div className="left_info">
                                    <p className="info_cont_title">Возраст</p>
                                    {/* <div className="info_algoritm_dates">
                                        <p className="text_info_cont_left">32</p>
                                        <p className="text_info_cont">вычислено алгоритмом</p>
                                    </div>
                                    <div className="info_algoritm_dates info_white">
                                        <p className="text_info_cont_left">48</p>
                                        <p className="text_info_cont">определено по фото</p>
                                    </div> */}
                                    {age > 0 ? <div className="info_algoritm_dates info_white">
                                        <p className="text_info_cont_left">{age}</p>
                                        <p className="text_info_cont">указано Вк</p>
                                    </div> : 
                                    <div className="info_algoritm_dates info_white">
                                        <p className="text_info_cont">не определено</p>
                                    </div>}
                                    <p className="info_cont_title top_m_32_info">Семейное положение</p>
                                    <p className="text_info_cont_left left_m_16">{relation}</p>
                                    <p className="info_cont_title top_m_32_info">Дети</p>
                                    <div className="info_algoritm_dates info_white">
                                        <p className="text_info_cont_left">{hasChild ? '1 и более' : '0'}</p>
                                        <p className="text_info_cont">вычислено по фотографиям</p>
                                    </div>
                                </div>
                            </div>
           
        );
    }
}
export default Social;

