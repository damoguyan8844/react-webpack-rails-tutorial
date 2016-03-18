
import React from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import { Link } from 'react-router';
import {FormattedMessage} from 'react-intl';
import QuestionList from './QuestionList';
import EditQuestion from './EditQuestion';
import HomeQuestions from './HomeQuestions';
import ChangeProfilePopover from '../../common/photoUploader/ChangeProfilePopover';
import RBService from '../../services/RBService';
import {changeProfilePhoto} from '../../actions/MeActionCreators';
class MatchSteps extends React.Component {
    constructor(props){
        super(props);
        this.state={
            showHomeQuestions:false,
            showChangeProfilePopover:false
        }
    }
    componentDidMount(){
        const noProfile = RB.getMe().overview.mainPhoto.isSystemDefault;
        if(noProfile){
            this.initDropZone();
        }
    }
    initDropZone(){
        var dz = new Dropzone('#home-profile-dropzone',{
            url:RBService.photoUploadUrl,
            headers:{
                "X-2RB-API-VERSION":"v2",
                "X-MOBILE-DEVICE":"iPhone",
                "X-2RB-APNS-DEVICE-TOKEN":"API_TEST",
                "X-2RB-WEBVIEW": '2RedBeans/1.0 MobileClient-1/1.0.1 (iPhone; iOS 8.0; locale en_US)'
            },
            paramName:'user_photo[picture]',
            clickable:true,
            previewsContainer:null,
            acceptedFiles: "image/jpeg,image/png,image/gif"
        });
        dz.on('sending',function(file,xhr,formData){
            formData.append('user_photo[is_main]',true);
        }.bind(this));
        dz.on('success',function(file,response){
            const photo = {user_photo:response.user_photo};
            this.props.changeProfilePhoto(photo);
        }.bind(this))
    }
    addProfilePhoto(){
        this.setState({showChangeProfilePopover:true});
    }
    editQuestions(){
        this.setState({showHomeQuestions:true});
    }

    onCloseQuestions(e){
        this.setState({showHomeQuestions:false});
    }
    onClosePhotoUploader(){
        this.setState({showChangeProfilePopover:false});
    }

    render() {

        const checkedIcon =
                <svg width="80px" height="80px" viewBox="0 0 80 80" version="1.1" xmlns="http://www.w3.org/2000/svg">

                    <g id="-Home" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" >
                        <g id="home----main----with-completed"  transform="translate(-58.000000, -129.000000)">
                            <g id="badges-signup"  transform="translate(18.000000, 75.000000)">
                                <g id="add-profile-photo" transform="translate(15.000000, 54.000000)" >
                                    <g id="Group-2" transform="translate(25.000000, 0.000000)">
                                        <circle id="Oval-13" fill="#EE3888" cx="40" cy="40" r="40"></circle>
                                        <g id="iconmonstr-check-mark-icon" transform="translate(14.000000, 20.000000)" fill="#FFFFFF">
                                            <path d="M44.795034,0.126128049 L19.2612549,25.5425305 L8.20136408,14.5304634 L0,22.695622 L19.2617694,41.873872 L53,8.28808537 L44.795034,0.126128049 Z" id="check-mark-icon"></path>
                                        </g>
                                    </g>
                                </g>
                            </g>
                        </g>
                    </g>
                </svg>
        const photoIcon =
            <svg width="82px" height="82px" viewBox="0 0 82 82" version="1.1" xmlns="http://www.w3.org/2000/svg"  >
                <g id="-Home" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" >
                    <g id="home----main----with-onboard"  transform="translate(-57.000000, -128.000000)">
                        <g id="badges-signup"  transform="translate(18.000000, 75.000000)">
                            <g id="add-profile-photo" transform="translate(15.000000, 54.000000)" >
                                <g id="Group-2" transform="translate(25.000000, 0.000000)">
                                    <circle id="Oval-13" stroke="#9E9E9E" cx="40" cy="40" r="40"></circle>
                                    <g id="man-icon" transform="translate(19.000000, 11.000000)" fill="#C8C8C8">
                                        <g id="Layer_1">
                                            <g id="Group" transform="translate(0.741406, 0.033367)">
                                                <g id="Shape">
                                                    <path d="M36.5638348,11.0171891 L38.9802698,17.0839232 C38.9802698,17.0839232 40.2495084,18.3458038 37.7598481,21.3791709 L43.3005628,29.0960566 C43.3005628,29.0960566 44.0572242,30.9888777 38.9802698,31.7411527 C38.9802698,31.7411527 38.9802698,33.0515672 39.492847,33.9251769 C39.492847,33.9251769 40.1274663,35.1627907 38.6141433,35.6723964 C38.6141433,35.6723964 40.615635,36.206269 37.3204963,39.239636 L37.4669469,43.8746208 L34.8064276,46.5197169 C34.8064276,46.5197169 19.0141705,41.6663296 16.2072005,40.7927199 C16.2072005,40.7927199 23.5297308,49.8200202 21.7479151,57.0273003 L8.95789545,16.8169869 C8.93348702,16.8412538 27.5327141,-4.27098079 36.5638348,11.0171891 L36.5638348,11.0171891 Z"></path>
                                                    <path d="M35.1969625,9.60970677 L35.1969625,6.30940344 C35.1969625,6.30940344 33.9033155,1.0677452 24.8966032,0.0970677452 L14.7426944,0.0970677452 C14.7426944,0.0970677452 0.463760255,0.582406471 0.21967591,15.0212336 C0.21967591,15.0212336 -0.268492779,25.5045501 5.8092074,31.3286148 C5.8092074,31.3286148 10.0318666,36.4489383 2.00149163,42.1274014 C2.00149163,42.1274014 18.8433114,53.5571284 24.5060682,61.6380182 C24.5060682,61.6380182 22.1628585,56.5662285 22.4801681,53.9696663 L23.4565055,51.1547017 L23.2856465,47.611729 C23.2856465,47.611729 22.7974778,43.9716886 26.1170249,43.2436805 C26.1414333,43.2436805 21.406197,10.5803842 35.1969625,9.60970677 L35.1969625,9.60970677 Z"></path>
                                                </g>
                                                <path d="M37.4425385,43.9231547 C37.4425385,43.9231547 37.4425385,45.9858443 34.7820191,46.5682508 C34.7820191,46.5682508 31.1939793,44.4327604 37.4425385,43.9231547 L37.4425385,43.9231547 Z" id="Shape"></path>
                                            </g>
                                        </g>
                                    </g>
                                </g>
                            </g>
                        </g>
                    </g>
                </g>
            </svg>
        const questionsIcon =
            <svg width="82px" height="82px" viewBox="0 0 82 82" version="1.1" xmlns="http://www.w3.org/2000/svg" >
            <g id="-Home" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" >
                <g id="home----main----with-onboard" transform="translate(-264.000000, -128.000000)">
                    <g id="badges-signup"  transform="translate(18.000000, 75.000000)">
                        <g id="answer-5-questions" transform="translate(197.000000, 54.000000)" >
                            <g id="Group-3" transform="translate(50.000000, 0.000000)">
                                <circle id="Oval-124-Copy-3" stroke="#9E9E9E" cx="40" cy="40" r="40"></circle>
                                <path d="M45.6371429,59.7916667 C45.6371428,62.6664238 43.3200085,64.9968749 40.4616786,64.9968749 C37.6033486,64.9968749 35.2862143,62.6664238 35.2862143,59.7916667 C35.2862143,56.9151836 37.6047397,54.5833333 40.4647857,54.5833333 C43.3275,54.5833333 45.6392143,56.9166667 45.6392143,59.7916667 L45.6371429,59.7916667 Z M40.6242857,15 C32.2826429,15 26,20.6104167 26,31.6666667 L34.1945714,31.6666667 C34.1945714,26.8666667 36.0712857,22.9375 40.4585714,22.9375 C43.0416429,22.9375 45.7821429,24.6666667 46.0182857,27.9625 C46.2730714,31.4333333 44.4295,33.1916667 42.0991429,35.425 C36.0422857,41.2166667 36.266,43.8625 36.266,50.4166667 L44.4336429,50.4166667 C44.4336429,47.3916667 44.1063571,45.1916667 48.2388571,40.7083333 C50.9938571,37.71875 54.4241429,34 54.4945714,28.3291667 C54.5981429,20.0729167 48.8022857,15 40.6284286,15 L40.6242857,15 Z" id="Shape" fill="#C7C7C7"></path>
                            </g>
                        </g>
                    </g>
                </g>
            </g>
        </svg>
        const detailsIcon = <svg width="82px" height="82px" viewBox="0 0 82 82" version="1.1" xmlns="http://www.w3.org/2000/svg" >

            <g id="-Home" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" >
                <g id="home----main----with-completed"  transform="translate(-474.000000, -128.000000)">
                    <g id="badges-signup"  transform="translate(18.000000, 75.000000)">
                        <g id="fill-out-details" transform="translate(435.000000, 54.000000)" >
                            <g id="Group" transform="translate(22.000000, 0.000000)">
                                <ellipse id="Oval-124-Copy-4" stroke="#9E9E9E" cx="40" cy="40.0515679" rx="40" ry="40.0515679"></ellipse>
                                <g id="iconmonstr-text-12" transform="translate(19.000000, 21.000000)" fill="#C7C7C7">
                                    <path d="M41,3.45454545 L0,3.45454545 L0,0 L41,0 L41,3.45454545 L41,3.45454545 Z M20.5,8.63636364 L0,8.63636364 L0,12.0909091 L20.5,12.0909091 L20.5,8.63636364 L20.5,8.63636364 Z M41,17.2727273 L0,17.2727273 L0,20.7272727 L41,20.7272727 L41,17.2727273 L41,17.2727273 Z M20.5,25.9090909 L0,25.9090909 L0,29.3636364 L20.5,29.3636364 L20.5,25.9090909 L20.5,25.9090909 Z M41,34.5454545 L0,34.5454545 L0,38 L41,38 L41,34.5454545 L41,34.5454545 Z" id="Shape"></path>
                                </g>
                            </g>
                        </g>
                    </g>
                </g>
            </g>
        </svg>
        const answered = this.props.me.insight.questions.filter(function(q){
            return q.answer && q.answer != '';
        });
        const questionChecked = answered.length >=5;
        const noProfile = RB.getMe().overview.mainPhoto.isSystemDefault;
        const detailsChecked = this.props.me.overview.profileProgress >50;
        return (
            <div className="match-steps">
                {this.state.showHomeQuestions && <HomeQuestions onCloseQuestions={this.onCloseQuestions.bind(this)} /> }
                {this.state.showChangeProfilePopover && <ChangeProfilePopover onClose={this.onClosePhotoUploader.bind(this)}/>}
                <div className="title">
                    <FormattedMessage id="get_better_matches_in_3_steps"/>
                </div>
                <div className="horizontal-delimit"></div>
                {noProfile &&
                <div className="step_wrapper">
                  <a id="home-profile-dropzone" className={noProfile?"step dropzone mobile":"step dropzone mobile checked"} >
                      <div className="dz-message">
                          <div className="step-icon">
                              {noProfile?photoIcon:checkedIcon}
                          </div>
                          <div className="step-title">
                              <FormattedMessage id="add_a_profile_photo"/>
                          </div>
                      </div>
                  </a>
                </div>
                }
                <div className="step_wrapper">
                  <a className={noProfile?"step desktop":"step checked"} onClick={noProfile?this.addProfilePhoto.bind(this):null}>
                      <div className="step-icon">
                          {noProfile?photoIcon:checkedIcon}
                      </div>
                      <div className="step-title">
                          <FormattedMessage id="add_a_profile_photo"/>
                      </div>
                  </a>
                </div>
                <div className="delimit"></div>
                <div className="step_wrapper">
                  <a className={questionChecked?"step checked":"step"} onClick={this.editQuestions.bind(this)}>
                      <div className="step-icon">
                          {questionChecked?checkedIcon:questionsIcon}
                      </div>
                      <div className="step-title">
                          <FormattedMessage id="answer_at_least_5_questions"/>
                      </div>
                  </a>
                </div>
                <div className="delimit"></div>
                <Link className={detailsChecked?"step checked":"step"} to="/myprofile/detail?edit=true">
                    <div className="step-icon">
                        {detailsChecked?checkedIcon:detailsIcon}
                    </div>
                    <div className="step-title">
                        <FormattedMessage id="fill_out_your_details"/>
                    </div>
                </Link>
            </div>
        )

    }
}
/*
MatchSteps.contextTypes = {
    history: React.PropTypes.object
};
*/
function mapStateToProps(state){
    return {
        me:state.me
    }
}

MatchSteps = connect(mapStateToProps,{changeProfilePhoto})(MatchSteps)
export default MatchSteps;
