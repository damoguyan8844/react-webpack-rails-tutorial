
import React from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import {FormattedMessage} from 'react-intl';
import Modal from 'react-bootstrap/lib/Modal';
import QuestionList from './QuestionList';
import EditQuestion from './EditQuestion';

class HomeQuestions extends React.Component {
    constructor(props){
        super(props);
        this.state={
            isMobile:false,
            showEditQuestion:false,
            editingQuestion:this.props.insight.questions[0]
        }
    }
    componentDidMount(){
        this.layoutHandler = this.onLayoutChanged.bind(this);
        RB.addChangeLayoutListener(this.layoutHandler);
        if(RB.isMobileLayout()){
            this.setState({isMobile:true});
        }
    }
    componentWillUnmount(){
        RB.removeChangeLayoutListener(this.layoutHandler);
    }
    onLayoutChanged(isMobile){
        this.setState({isMobile:isMobile});
    }
    onClose(){
        this.props.onCloseQuestions && this.props.onCloseQuestions();
    }
    onEditQuestion(q){
        this.setState({
            showEditQuestion:true,
            editingQuestion:q
        })
    }
    onCancelEditQuestion(){
        this.setState({showEditQuestion:false});
    }
    onSaveQuestion(){
        this.setState({showEditQuestion:false});
    }
    render() {
        const isMobile = this.state.isMobile;
        return (
            <div>
                { isMobile &&
                    <div className="mobile-question-list">
                        <QuestionList {...this.props}  editingQuestion={this.state.editingQuestion} onEditQuestion={this.onEditQuestion.bind(this)}/>
                        <div className="done">
                            <span className="done-btn" onClick={this.onClose.bind(this)}>
                                <FormattedMessage id='iam_done'/>
                            </span>
                        </div>
                    </div>
                }
                {this.state.showEditQuestion && isMobile &&
                    <div className="mobile-edit-question">
                    <EditQuestion question={this.state.editingQuestion} onSave={this.onSaveQuestion.bind(this)} onCancel={this.onCancelEditQuestion.bind(this)} />
                    </div>
                }
                {  !isMobile &&
                <Modal dialogClassName="home-question-popover animated fadeIn" animation={false} show={true} onHide={this.onClose.bind(this)} container={this} >
                    <Modal.Body >
                        <div className="popover-body">
                            <div className="close-btn" onClick={this.onClose.bind(this)}>
                                <FormattedMessage id='iam_done'/>
                            </div>
                            <QuestionList {...this.props} editingQuestion={this.state.editingQuestion} onEditQuestion={this.onEditQuestion.bind(this)} />
                            <EditQuestion question={this.state.editingQuestion}/>
                        </div>
                    </Modal.Body>
                </Modal>
                }
            </div>
        )

    }
}

function mapStateToProps(state){
    return {
        insight:state.me.insight
    }
}

HomeQuestions = connect(mapStateToProps)(HomeQuestions)
export default HomeQuestions;
