
import React from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import {FormattedMessage} from 'react-intl';
import {saveQuestion} from '../../actions/MeActionCreators.js';
import RBService from '../../services/RBService';

class EditQuestion extends React.Component {
    constructor(props){
        super(props);
        this.state={
            answer:props.question.answer
        }
    }
    componentWillReceiveProps(nextProps){
        this.setState({answer:nextProps.question.answer});
    }
    onCancel(){
        this.props.onCancel && this.props.onCancel();
    }
    onSave(){
        RBService.saveQuestion(this.props.question.id,this.state.answer)
        .then(function(){
                this.props.dispatch(saveQuestion(this.props.question.id,this.state.answer));
                this.props.onSave && this.props.onSave();
        }.bind(this))
    }
    onChangeAnswer(e){
        this.setState({answer: e.target.value});
    }
    render() {
        const answer = this.state.answer?this.state.answer:'';
        return (
            <div className="edit-question">
                <div className="question-header">
                   {this.props.question.description}
                </div>
                <div className="edit-area">
                    <div className="edit-text-area">
                        <textarea value={answer} onChange={this.onChangeAnswer.bind(this)} placeholder={this.props.question.tooltip}/>
                    </div>
                    <div>
                        <span className="cancel" onClick={this.onCancel.bind(this)}>
                            <FormattedMessage id='cancel'/>
                        </span>
                        <span className="save" onClick={this.onSave.bind(this)}>
                            <FormattedMessage id='save'/>
                        </span>
                    </div>
                </div>

            </div>
        )

    }
}



export default connect()(EditQuestion);
