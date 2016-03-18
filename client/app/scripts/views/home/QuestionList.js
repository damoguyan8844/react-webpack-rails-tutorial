
import React from 'react';
import ReactDOM from 'react-dom';
import {FormattedMessage} from 'react-intl';
class QuestionList extends React.Component {

    onClickQuestion(q){
        this.props.onEditQuestion && this.props.onEditQuestion(q);
    }
    render() {
        const checkedIcon =
            <svg width="16px" height="16px" viewBox="0 0 16 16" version="1.1" xmlns="http://www.w3.org/2000/svg" >
                <defs>
                    <path id="path-1" d="M0,0 L9.5616,0 L9.5616,7.2 L0,7.2 L0,0 Z"></path>
                </defs>
                <g id="-Home" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" >
                    <g id="home----main----questions"  transform="translate(-481.000000, -379.000000)">
                        <g id="popup"  transform="translate(192.000000, 241.000000)">
                            <g id="questions" transform="translate(-2.000000, 126.000000)">
                                <g id="about">
                                    <g id="button/select/checked" transform="translate(291.000000, 12.000000)">
                                        <circle id="Oval-22" fill="#EE3888"  cx="8" cy="8" r="8"></circle>
                                        <g id="check" transform="translate(3.200000, 4.800000)">
                                            <mask id="mask-2" fill="white">
                                                <use ></use>
                                            </mask>
                                            <g id="Clip-2"></g>
                                            <path d="M2.8672,5.55054545 L0.71744,3.35192727 L0,4.08305455 L2.8672,7.01607273 L9.00992,0.733745455 L8.29504,0 L2.8672,5.55054545 Z" id="Fill-1" fill="#FFFFFF"  mask="url(#mask-2)"></path>
                                        </g>
                                    </g>
                                </g>
                            </g>
                        </g>
                    </g>
                </g>
            </svg>
        const arrowIcon =
            <svg width="11px" height="18px" viewBox="0 0 11 18" version="1.1" xmlns="http://www.w3.org/2000/svg" >
                <defs></defs>
                <g id="-Home" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" >
                    <g id="m.home----questions----list"  transform="translate(-294.000000, -137.000000)" fill="#767676">
                        <g id="questions"  transform="translate(-1.000000, 125.000000)">
                            <g id="about" >
                                <g id="arrow" transform="translate(295.000000, 12.000000)">
                                    <path d="M0.0139923372,2.39793204 L2.33823755,0 L10.9789272,9 L2.33823755,18 L0.0139923372,15.6020243 L6.35247893,9 L0.0139923372,2.39793204 Z" id="arrow-25-icon"></path>
                                </g>
                            </g>
                        </g>
                    </g>
                </g>
            </svg>
        const questions = this.props.insight.questions && this.props.insight.questions.map(function(q){
            const icon = q.answer?checkedIcon:arrowIcon;
            const isActive = this.props.editingQuestion.id == q.id;
            return (
                <div className={isActive?"item active":"item"} key={q.id} onClick={this.onClickQuestion.bind(this,q)}>
                    <div className="name">{q.description}</div>
                    <div className="arrow">{icon}</div>
                </div>
            )
        }.bind(this));

        return (
            <div className="question-list">
                <div className="list-header">
                    <div className="header-title">
                        <FormattedMessage id="give_people_some_insight" />
                    </div>
                    <div className="desc">
                        <FormattedMessage id="answer_as_many_as_little" />
                    </div>
                </div>
                <div className="list">
                    {questions}
                </div>
            </div>
        )

    }
}


export default QuestionList;
