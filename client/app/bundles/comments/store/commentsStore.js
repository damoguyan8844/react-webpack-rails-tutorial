import { compose, createStore, applyMiddleware, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
import loggerMiddleware from 'libs/middlewares/loggerMiddleware';
import reducers from '../reducers';
import { initalStates } from '../reducers';
import User from '../../../scripts/models/User.js';

export default props => {
  var userJson = {"is_spammer":false,"timestamp":1455586372,"current_user":{"unread_matched_by_count":0,"see_favorite_me":0,"progress_to_next_level":30,"unread_favored_by_count":0,"unread_visited_by_count":0,"see_visitors":0,"reward_points_count":154,"see_vistors":0,"need_reload_me":1,"custom_search":0,"vip_status":0,"charm_level":6,"favored_by_count":0,"message_user":0,"photo_status":0},"user":{"profile_details":{"marital_status":{"multiple_values_allowed":false,"label":"Marital Status"},"other_languages":{"values":[],"label":""},"ethnicity":{"value":"1","multiple_values_allowed":false,"label":"Ethnicity","text":"Chinese"},"religion":{"multiple_values_allowed":false,"label":"Faith"},"birth_country":{"label":"Birthplace"},"height":{"label":"Height"},"grad_school":{"label":"Grad School"},"immigration":{"multiple_values_allowed":false,"label":"Status"},"occupation":{"multiple_values_allowed":false,"label":"Job"},"college":{"label":"Undergrad"},"cn_zodiac":{"value":"2","multiple_values_allowed":false,"label":"Zodiac","text":"Ox"},"interests":{"multiple_values_allowed":true,"label":"Interests"},"languages":{"values":[{"value":"3","text":"English"}],"multiple_values_allowed":true,"label":"Languages"},"first_arrive":{"label":"Age arrived"},"education":{"multiple_values_allowed":false,"label":"Education"},"income":{"multiple_values_allowed":false,"label":"Income"},"has_children":{"multiple_values_allowed":false,"label":"Has Children"},"body_type":{"multiple_values_allowed":false,"label":"Body Type"},"smoking":{"value":"1","multiple_values_allowed":false,"label":"Smoking","text":"No"},"zodiac":{"value":"1","multiple_values_allowed":false,"label":"Sign","text":"Capricorn"},"drinking":{"value":"1","multiple_values_allowed":false,"label":"Drinking","text":"No"}},"is_first_name_change_restricted":false,"admired_by_current_user":false,"has_active_vip":0,"main_photo":{"tags":[{"tag":{"index":0,"mark":1,"count":2,"id":6}}],"mobile_image_url":"http://d1qltpvz66ohy.cloudfront.net/user_photos/pictures/283/mobile/face.jpg?1452670202","original_image_url":"http://d1qltpvz66ohy.cloudfront.net/user_photos/pictures/283/original/face.jpg?1452670202","flagged":0,"is_main_photo":true,"crop_x":0,"crop_y":0,"small_image_url":"http://d1qltpvz66ohy.cloudfront.net/user_photos/pictures/283/small/face.jpg?1452670202","crop_h":450,"large_image_url":"http://d1qltpvz66ohy.cloudfront.net/user_photos/pictures/283/large/face.jpg?1452670202","id":283,"crop_w":450,"is_under_review":true},"first_name":"Mengchun","user_photo_status":0,"need_basic_info":false,"birthday":505987200,"is_sex_change_restricted":true,"preferred_locale":"en","location_short_description":"San Francisco, CA, United States","city":"San Francisco","invisible":false,"location":"94110","has_wink_quota":true,"country":1,"seeking":2,"is_birthday_change_restricted":false,"email":"mengchun@2redbeans.com","favorited_by_current_user":false,"location_long_description":"San Francisco, CA, United States","sex":1,"online":true,"public_uid":"14043625","looking_for_details":{"marital_status":{"multiple_values_allowed":true,"label":"Marital Status"},"ethnicity":{"multiple_values_allowed":true,"label":"Ethnicity"},"religion":{"multiple_values_allowed":true,"label":"Faith"},"birth_country":{"label":"Birthplace"},"height":{"label":"Height"},"immigration":{"multiple_values_allowed":true,"label":"Immigration"},"occupation":{"multiple_values_allowed":true,"label":"Job"},"age":{"label":"Ages","text":"25 - 45","top":45,"bottom":25},"languages":{"multiple_values_allowed":true,"label":"Languages"},"income":{"multiple_values_allowed":true,"label":"Income"},"has_children":{"multiple_values_allowed":true,"label":"Has Children"},"body_type":{"multiple_values_allowed":true,"label":"Body Type"},"smoking":{"values":[{"value":"2","text":"Sometimes"}],"multiple_values_allowed":true,"label":"Smoking"},"drinking":{"multiple_values_allowed":true,"label":"Drinking"}},"open_answers":[{"open_answer":{"open_question":{"tooltip":"What are you most passionate about. Random things about you. Your hobbies, interests, etc. Are you introvert or extravert?  Do you like to play tricks on your friends?  Are you a party animal?","description":"Brief Description","id":1}}},{"open_answer":{"open_question":{"tooltip":"What do you do on a typical Friday night, the weekends?  Do you hang out with friends, read, go out parting?","description":"I usually spend my leisure time doing","id":2}}},{"open_answer":{"open_question":{"tooltip":"Raindrops on roses and whiskers on kittens? What's your Favorite books, author, music, TV shows, movies, flower, animal, color, etc.","description":"My favorite things","id":3}}},{"open_answer":{"open_question":{"tooltip":"What are they?","description":"5 things I can not live without","id":4}}},{"open_answer":{"open_question":{"tooltip":"Choices? Too many: Affectionate, Ambitious, Articulate, Boring, Caring, Curious, Creative, Dependable, Easy-Going, Energetic, Funny, Genuine, Generous, Good Listener, Kind, Loyal, Modest, Passionate, Perceptive, Quirky, Outgoing, Optimistic, Quiet, Romantic, Respectful, Spontaneous, Spiritual, Rational, Happy, Genuine, Intelligent, Sweet,Thoughtful, Warm, Workaholic","description":"3 adjectives my friends describe me","id":5}}},{"open_answer":{"open_question":{"tooltip":"Do you give others a different first impression than you actually are.  What are the things they don't notice but you wish they did.","description":"People's first impression about me.  And what they don't notice at the beginning.","id":6}}},{"open_answer":{"open_question":{"tooltip":"Let your imagination run wild. :) ","description":"The craziest things that I have done.  The most secret, silliest things I would admit here.","id":7}}},{"open_answer":{"open_question":{"tooltip":"A parent, a friend, a teacher, a stranger, your narcissistic self? How did this person change your life, in what way?","description":"The most influential person of my life","id":8}}},{"open_answer":{"open_question":{"tooltip":"Moral values? Similar background? Similar interests? Or am I just as superficial as everyone else: I want someone hot!","description":"The most important qualities that I'm looking for in a partner","id":9}}},{"open_answer":{"open_question":{"tooltip":"Age, sexual orientation, looking for serious relationship/friend, introvert/extrovert, boring, quirky, etc...","description":"Contact me if you are ...","id":10}}},{"open_answer":{"open_question":{"tooltip":"Do you have anything you would like to ask about your match?  Help him/her to jump start the conversation!","description":"Question I would like to ask my match","id":11}}}],"user_photos":[{"user_photo":{"tags":[{"tag":{"index":0,"mark":1,"count":2,"id":6}}],"mobile_image_url":"http://d1qltpvz66ohy.cloudfront.net/user_photos/pictures/283/mobile/face.jpg?1452670202","original_image_url":"http://d1qltpvz66ohy.cloudfront.net/user_photos/pictures/283/original/face.jpg?1452670202","flagged":0,"is_main_photo":true,"crop_x":0,"crop_y":0,"small_image_url":"http://d1qltpvz66ohy.cloudfront.net/user_photos/pictures/283/small/face.jpg?1452670202","crop_h":450,"large_image_url":"http://d1qltpvz66ohy.cloudfront.net/user_photos/pictures/283/large/face.jpg?1452670202","id":283,"crop_w":450,"is_under_review":true}},{"user_photo":{"tags":[],"mobile_image_url":"http://d1qltpvz66ohy.cloudfront.net/user_photos/pictures/285/mobile/2redbeans-development-fff2e168104a6908eb8d8693529e505f3ff0f09b.jpg?1452680518","original_image_url":"http://d1qltpvz66ohy.cloudfront.net/user_photos/pictures/285/original/2redbeans-development-fff2e168104a6908eb8d8693529e505f3ff0f09b.jpg?1452680518","flagged":0,"is_main_photo":false,"crop_x":0,"crop_y":0,"small_image_url":"http://d1qltpvz66ohy.cloudfront.net/user_photos/pictures/285/small/2redbeans-development-fff2e168104a6908eb8d8693529e505f3ff0f09b.jpg?1452680518","crop_h":200,"large_image_url":"http://d1qltpvz66ohy.cloudfront.net/user_photos/pictures/285/large/2redbeans-development-fff2e168104a6908eb8d8693529e505f3ff0f09b.jpg?1452680518","id":285,"crop_w":200,"is_under_review":true}},{"user_photo":{"tags":[],"mobile_image_url":"http://d1qltpvz66ohy.cloudfront.net/user_photos/pictures/287/mobile/2redbeans-development-ee243c4b605a9b51d0fe7cc08c31f50518cb5192.jpg?1452681667","original_image_url":"http://d1qltpvz66ohy.cloudfront.net/user_photos/pictures/287/original/2redbeans-development-ee243c4b605a9b51d0fe7cc08c31f50518cb5192.jpg?1452681667","flagged":0,"is_main_photo":false,"crop_x":0,"crop_y":0,"small_image_url":"http://d1qltpvz66ohy.cloudfront.net/user_photos/pictures/287/small/2redbeans-development-ee243c4b605a9b51d0fe7cc08c31f50518cb5192.jpg?1452681667","crop_h":200,"large_image_url":"http://d1qltpvz66ohy.cloudfront.net/user_photos/pictures/287/large/2redbeans-development-ee243c4b605a9b51d0fe7cc08c31f50518cb5192.jpg?1452681667","id":287,"crop_w":200,"is_under_review":true}},{"user_photo":{"tags":[],"mobile_image_url":"http://d1qltpvz66ohy.cloudfront.net/user_photos/pictures/288/mobile/2redbeans-development-ddf20761f1aaf7ff659811320bdca25de191650e.jpg?1452681772","original_image_url":"http://d1qltpvz66ohy.cloudfront.net/user_photos/pictures/288/original/2redbeans-development-ddf20761f1aaf7ff659811320bdca25de191650e.jpg?1452681772","flagged":0,"is_main_photo":false,"crop_x":0,"crop_y":0,"small_image_url":"http://d1qltpvz66ohy.cloudfront.net/user_photos/pictures/288/small/2redbeans-development-ddf20761f1aaf7ff659811320bdca25de191650e.jpg?1452681772","crop_h":200,"large_image_url":"http://d1qltpvz66ohy.cloudfront.net/user_photos/pictures/288/large/2redbeans-development-ddf20761f1aaf7ff659811320bdca25de191650e.jpg?1452681772","id":288,"crop_w":200,"is_under_review":true}},{"user_photo":{"tags":[],"mobile_image_url":"http://d1qltpvz66ohy.cloudfront.net/user_photos/pictures/289/mobile/2redbeans-development-28f9d83975fa756854421e60a2501b4c3d9780bc.jpg?1452682458","original_image_url":"http://d1qltpvz66ohy.cloudfront.net/user_photos/pictures/289/original/2redbeans-development-28f9d83975fa756854421e60a2501b4c3d9780bc.jpg?1452682458","flagged":0,"is_main_photo":false,"crop_x":0,"crop_y":0,"small_image_url":"http://d1qltpvz66ohy.cloudfront.net/user_photos/pictures/289/small/2redbeans-development-28f9d83975fa756854421e60a2501b4c3d9780bc.jpg?1452682458","crop_h":200,"large_image_url":"http://d1qltpvz66ohy.cloudfront.net/user_photos/pictures/289/large/2redbeans-development-28f9d83975fa756854421e60a2501b4c3d9780bc.jpg?1452682458","id":289,"crop_w":200,"is_under_review":true}},{"user_photo":{"tags":[],"mobile_image_url":"http://d1qltpvz66ohy.cloudfront.net/user_photos/pictures/290/mobile/2redbeans-development-a131a31f5beb0df8988f4fb53fe780e445c23532.jpg?1452682561","original_image_url":"http://d1qltpvz66ohy.cloudfront.net/user_photos/pictures/290/original/2redbeans-development-a131a31f5beb0df8988f4fb53fe780e445c23532.jpg?1452682561","flagged":0,"is_main_photo":false,"crop_x":0,"crop_y":0,"small_image_url":"http://d1qltpvz66ohy.cloudfront.net/user_photos/pictures/290/small/2redbeans-development-a131a31f5beb0df8988f4fb53fe780e445c23532.jpg?1452682561","crop_h":200,"large_image_url":"http://d1qltpvz66ohy.cloudfront.net/user_photos/pictures/290/large/2redbeans-development-a131a31f5beb0df8988f4fb53fe780e445c23532.jpg?1452682561","id":290,"crop_w":200,"is_under_review":true}},{"user_photo":{"tags":[],"mobile_image_url":"http://d1qltpvz66ohy.cloudfront.net/user_photos/pictures/291/mobile/2redbeans-development-0500d447118854b917e37a4eebcc61358833f598.png?1452682708","original_image_url":"http://d1qltpvz66ohy.cloudfront.net/user_photos/pictures/291/original/2redbeans-development-0500d447118854b917e37a4eebcc61358833f598.png?1452682708","flagged":0,"is_main_photo":false,"crop_x":0,"crop_y":0,"small_image_url":"http://d1qltpvz66ohy.cloudfront.net/user_photos/pictures/291/small/2redbeans-development-0500d447118854b917e37a4eebcc61358833f598.png?1452682708","crop_h":200,"large_image_url":"http://d1qltpvz66ohy.cloudfront.net/user_photos/pictures/291/large/2redbeans-development-0500d447118854b917e37a4eebcc61358833f598.png?1452682708","id":291,"crop_w":200,"is_under_review":true}},{"user_photo":{"tags":[],"mobile_image_url":"http://d1qltpvz66ohy.cloudfront.net/user_photos/pictures/294/mobile/2redbeans-development-aa9020b2c8e1c11422ba2b417f8ef9e0464858a0.png?1452683561","original_image_url":"http://d1qltpvz66ohy.cloudfront.net/user_photos/pictures/294/original/2redbeans-development-aa9020b2c8e1c11422ba2b417f8ef9e0464858a0.png?1452683561","flagged":0,"is_main_photo":false,"crop_x":0,"crop_y":0,"small_image_url":"http://d1qltpvz66ohy.cloudfront.net/user_photos/pictures/294/small/2redbeans-development-aa9020b2c8e1c11422ba2b417f8ef9e0464858a0.png?1452683561","crop_h":200,"large_image_url":"http://d1qltpvz66ohy.cloudfront.net/user_photos/pictures/294/large/2redbeans-development-aa9020b2c8e1c11422ba2b417f8ef9e0464858a0.png?1452683561","id":294,"crop_w":200,"is_under_review":true}},{"user_photo":{"tags":[],"mobile_image_url":"http://d1qltpvz66ohy.cloudfront.net/user_photos/pictures/295/mobile/2redbeans-development-d88e2bf827fb5bf7e0abdc13aac2d45c972f7430.png?1452683911","original_image_url":"http://d1qltpvz66ohy.cloudfront.net/user_photos/pictures/295/original/2redbeans-development-d88e2bf827fb5bf7e0abdc13aac2d45c972f7430.png?1452683911","flagged":0,"is_main_photo":false,"crop_x":0,"crop_y":0,"small_image_url":"http://d1qltpvz66ohy.cloudfront.net/user_photos/pictures/295/small/2redbeans-development-d88e2bf827fb5bf7e0abdc13aac2d45c972f7430.png?1452683911","crop_h":200,"large_image_url":"http://d1qltpvz66ohy.cloudfront.net/user_photos/pictures/295/large/2redbeans-development-d88e2bf827fb5bf7e0abdc13aac2d45c972f7430.png?1452683911","id":295,"crop_w":200,"is_under_review":true}},{"user_photo":{"tags":[],"mobile_image_url":"http://d1qltpvz66ohy.cloudfront.net/user_photos/pictures/296/mobile/2redbeans-development-af5d716eaf95543e85a1b29824c0421553f4c780.png?1452683973","original_image_url":"http://d1qltpvz66ohy.cloudfront.net/user_photos/pictures/296/original/2redbeans-development-af5d716eaf95543e85a1b29824c0421553f4c780.png?1452683973","flagged":0,"is_main_photo":false,"crop_x":0,"crop_y":0,"small_image_url":"http://d1qltpvz66ohy.cloudfront.net/user_photos/pictures/296/small/2redbeans-development-af5d716eaf95543e85a1b29824c0421553f4c780.png?1452683973","crop_h":200,"large_image_url":"http://d1qltpvz66ohy.cloudfront.net/user_photos/pictures/296/large/2redbeans-development-af5d716eaf95543e85a1b29824c0421553f4c780.png?1452683973","id":296,"crop_w":200,"is_under_review":true}},{"user_photo":{"tags":[],"mobile_image_url":"http://d1qltpvz66ohy.cloudfront.net/user_photos/pictures/297/mobile/2redbeans-development-e1798ba7878286ffc34bc794d453bd47cf9623cb.png?1452683982","original_image_url":"http://d1qltpvz66ohy.cloudfront.net/user_photos/pictures/297/original/2redbeans-development-e1798ba7878286ffc34bc794d453bd47cf9623cb.png?1452683982","flagged":0,"is_main_photo":false,"crop_x":0,"crop_y":0,"small_image_url":"http://d1qltpvz66ohy.cloudfront.net/user_photos/pictures/297/small/2redbeans-development-e1798ba7878286ffc34bc794d453bd47cf9623cb.png?1452683982","crop_h":200,"large_image_url":"http://d1qltpvz66ohy.cloudfront.net/user_photos/pictures/297/large/2redbeans-development-e1798ba7878286ffc34bc794d453bd47cf9623cb.png?1452683982","id":297,"crop_w":200,"is_under_review":true}}],"honored":true,"user_hash":"bc2f605cd87a35bc4e2b7370955c805a0d843a36d07d23d5b98d0497ad59518b","subscription_type":0,"user_type":0,"common_interests":{},"lat":37.7489,"invisible_feature_available":false,"about_me_short":"...","profile_progress_details":{"more_basic_percent":{"value":25,"text":"Fill more basic info"},"basic_percent":{"value":44,"text":"Fill in basic info"},"photos_percent":{"value":11,"text":"Add a profile photo"},"about_you_percent":{"value":12,"text":"Descripe my self"},"answers_percent":{"value":0,"text":"Answer a profile question"}},"email_confirmed":true,"last_online_description":"Online","settings":{"preferred_timezone":"America/Los_Angeles"},"lng":-122.416,"state":"CA","goal_progress_details":{"profile_90":{"value":5,"complete":false,"text":"Complete profile 90%"},"upload_photos":{"value":5,"complete":true,"text":"Upload photo"},"profile_50":{"value":5,"complete":true,"text":"Complete profile 50%"},"send_5_messages":{"value":4,"complete":false,"text":"Send messages to 5 people"},"send_1_message":{"value":1,"complete":false,"text":"Send 1 message"},"invite_1_friend":{"value":10,"complete":false,"text":"Invite 1 friend"},"invite_5_friends":{"value":20,"complete":false,"text":"Invite 5 friends"},"invite_3_friends":{"value":20,"complete":false,"text":"Invite 3 friends"}},"profile_progress":53,"token":"afGtqMk7vU"}};
  var user = new User(userJson.user,userJson.current_user).data;
  const initialState = {
    me: user,
  };

  const reducer = combineReducers(reducers);
  const composedStore = compose(
    applyMiddleware(thunkMiddleware, loggerMiddleware)
  );

  return composedStore(createStore)(reducer, initialState);
};
