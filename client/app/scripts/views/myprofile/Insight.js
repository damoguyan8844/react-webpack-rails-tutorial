
var React = require('react');
var ReactDOM = require('react-dom');
import {connect} from 'react-redux';
import Tooltip from 'react-bootstrap/lib/Tooltip';
import OverlayTrigger from 'react-bootstrap/lib/OverlayTrigger';

import RBService from '../../services/RBService.js';
import {saveQuestion} from '../../actions/MeActionCreators.js';

var EditBlock = React.createClass({
    getInitialState:function(){
        return {
            editMode:false,
            answer:this.props.data.answer
        }
    },
    componentDidUpdate:function(prevProps, prevState){
        if(this.state.editMode){
            ReactDOM.findDOMNode(this.refs.answerTextArea).focus();
        }
    },
    onFocusAnswer:function(e){
        //move the caret to the end of answer
        const val = this.state.answer;
        $(e.target).val('').val(val);
    },
    onEdit:function(){
        this.setState({editMode:true});

    },
    onToggleEdit:function(){
        this.setState({editMode:!this.state.editMode});
    },
    onCancel:function(){
        this.setState({editMode:false, answer:this.props.data.answer});
    },
    onSave:function(){
        var ans = this.state.answer.trim();
        this.setState({editMode:false});
        if(ans == ''){
            this.setState({answer:this.props.data.answer});
        }
        else if( ans != this.props.data.answer && ans != '-'){
            RBService.saveQuestion(this.props.data.id,ans)
            .then(function(response){
                    this.props.saveQuestion(this.props.data.id,ans);
            }.bind(this))
        }
    },
    onChangeAnswer:function(e){
        this.setState({answer: e.target.value});
    },
    render: function(){
        var data = this.props.data;
        var answer = this.state.answer?this.state.answer:(this.state.editMode?'':'-');
        var tooltip =  (
            <Tooltip id={data.id}>{data.tooltip}</Tooltip>
        );
        return(

        <div>
            <div className="myinsight myinsight_title">
                <OverlayTrigger placement="top" overlay={tooltip}>
                <span className="myinsight_question" onClick={this.onToggleEdit}>{data.description}</span>
                </OverlayTrigger>
                <span className="myinsight_edit-pencil" onClick={this.onToggleEdit}><i className="icon-button-edit"></i></span>
            </div>
            <hr className="myinsight_divider"/>
            {this.state.editMode &&
            <div>
                <textarea ref="answerTextArea" onFocus={this.onFocusAnswer} className="myinsight_textbox" value={answer} onChange={this.onChangeAnswer}/>
                <div className="buttons">
                    <span className="myinsight_cancel" onClick={this.onCancel}>Cancel</span>
                    <span className="myinsight_save" onClick={this.onSave}>Save</span>
                </div>
            </div>
            }
            { !this.state.editMode &&
            <div>
                <div>
                    <div onClick={this.onToggleEdit} className="myinsight_answer">{answer}</div>
                </div>
                <div className="buttons myinsight_mobile">
                    <span className="myinsight_edit" onClick={this.onEdit}><i className="icon-button-edit"></i>Edit</span>
                </div>
            </div>
            }
        </div>
        )
    }
});

var Insight = React.createClass({
    render: function(){
        var questions = this.props.insight.questions.map(function(q){
            return <EditBlock {...this.props} data={q} key={q.id} />;
        }.bind(this));

        return(
            <div className="rb-myprofile-insight more">
                {questions}
            </div>
        )
    }
});

function mapStateToProps(state){
    return {
        insight:state.me.insight
    }
}

Insight = connect(mapStateToProps,{saveQuestion})(Insight)

export default  Insight;
