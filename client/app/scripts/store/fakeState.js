const fakeState = {
	isInputEmpty: true,
	mobileHeaderHeight: 0,
	isMobileView: false,
	shouldSlimConvPanel: false,
	isInbox: true,
	currentPeer: {
        "name": "she",
        "age": 30,
        "VIP": false,
        "locked": true,
        "photoURL": "http://d1qltpvz66ohy.cloudfront.net/user_photos/pictures/657971/small/2redbeans-testing-16295ba790c03b9e3c9c7da947eb1669c435355d.jpg",
        "location": "United States",
        "token": "5Fg71dMs8C",
        "numUnread": 0,
        "numReceived": 1,
        "lastMessage": {
            "senderToken": "p9gKepeP5N",
            "receiverToken": "5Fg71dMs8C",
            "time": 1448912690783,
            "locked": true,
            "type": 0,
            "seq": 1448912690783,
            "msg": "37"
        },
        "hasPushNotificationDevice": 1,
        "lastProcessedSeq": 0
	},
	inbox: {
		isFetching: false,
		nextInboxPeerSeq: '',
		noMoreInboxPeers: false,
		peers: [
		    {
		        "name": "she",
		        "age": 30,
		        "VIP": false,
		        "locked": true,
		        "photoURL": "http://d1qltpvz66ohy.cloudfront.net/user_photos/pictures/657971/small/2redbeans-testing-16295ba790c03b9e3c9c7da947eb1669c435355d.jpg",
		        "location": "United States",
		        "token": "5Fg71dMs8C",
		        "numUnread": 0,
		        "numReceived": 1,
		        "lastMessage": {
		            "senderToken": "p9gKepeP5N",
		            "receiverToken": "5Fg71dMs8C",
		            "time": 1448912690783,
		            "locked": true,
		            "type": 0,
		            "seq": 1448912690783,
		            "msg": "37"
		        },
		        "hasPushNotificationDevice": 1,
		        "lastProcessedSeq": 0
		    },
		    {
		        "name": "Q test",
		        "age": 30,
		        "VIP": false,
		        "locked": true,
		        "photoURL": "http://testing.2redbeans.com/images/no_photo_small.png",
		        "location": "San Francisco, CA, United States",
		        "token": "iH76KNsLhB",
		        "numUnread": 0,
		        "numReceived": 3,
		        "lastMessage": {
		            "senderToken": "p9gKepeP5N",
		            "receiverToken": "iH76KNsLhB",
		            "time": 1448492508736,
		            "locked": false,
		            "type": 0,
		            "seq": 1448492508736,
		            "msg": "hihi"
		        },
		        "hasPushNotificationDevice": 0,
		        "lastProcessedSeq": "1448305837906.0"
		    },
		    {
		        "name": "test",
		        "age": 30,
		        "VIP": false,
		        "locked": true,
		        "photoURL": "http://d1qltpvz66ohy.cloudfront.net/user_photos/pictures/657938/small/2redbeans-testing-13621ba82a872fa68c4b9f408ac3bdeb9c16112e.jpg",
		        "location": "Pleasanton, CA, United States",
		        "token": "VaZWjdfv0U",
		        "numUnread": 2,
		        "numReceived": 2,
		        "lastMessage": {
		            "senderToken": "VaZWjdfv0U",
		            "receiverToken": "p9gKepeP5N",
		            "time": 1447456458976,
		            "locked": false,
		            "type": 0,
		            "seq": 1447456458976,
		            "msg": "Q: How was Thomas J. Watson buried? A: 9 edge down.",
		            "readAt": 0
		        },
		        "hasPushNotificationDevice": 1,
		        "lastProcessedSeq": "1447447531277.0"
		    },
		    {
		        "name": "sunnyyants",
		        "age": 25,
		        "VIP": false,
		        "locked": false,
		        "photoURL": "http://d1qltpvz66ohy.cloudfront.net/user_photos/pictures/329139/small/2redbeans-d2aea8799024bc624932fcbf372e3e3fb37f5d76.jpg",
		        "location": "San Jose, CA, United States",
		        "token": "PmW5983Tnj",
		        "numUnread": 0,
		        "numReceived": 1,
		        "lastMessage": {
		            "senderToken": "PmW5983Tnj",
		            "receiverToken": "p9gKepeP5N",
		            "time": 1447455746696,
		            "locked": false,
		            "type": 0,
		            "seq": 1447455746696,
		            "msg": "Writing is turning one's worst moments into money.   -- J.P. Donleavy",
		            "readAt": 1448306701469
		        },
		        "hasPushNotificationDevice": 1,
		        "lastProcessedSeq": 0
		    },
		    {
		        "name": "Luke",
		        "age": 30,
		        "VIP": false,
		        "locked": true,
		        "photoURL": "http://d1qltpvz66ohy.cloudfront.net/user_photos/pictures/657976/small/2redbeans-testing-4909bbd95f1e878e57e3e25cf9c11aa3e18f1c9d.jpg",
		        "location": "San Francisco, CA, United States",
		        "token": "pmaJn6DMUx",
		        "numUnread": 1,
		        "numReceived": 1,
		        "lastMessage": {
		            "senderToken": "pmaJn6DMUx",
		            "receiverToken": "p9gKepeP5N",
		            "time": 1447455445252,
		            "locked": false,
		            "type": 0,
		            "seq": 1447455445252,
		            "msg": "You have a strong appeal for members of your own sex.",
		            "readAt": 0
		        },
		        "hasPushNotificationDevice": 1,
		        "lastProcessedSeq": 0
		    },
		    {
		        "name": "Luke Skywalker",
		        "age": 30,
		        "VIP": false,
		        "locked": true,
		        "photoURL": "http://testing.2redbeans.com/images/no_photo_small.png",
		        "location": "San Francisco, CA, United States",
		        "token": "eqq0Ktcj9W",
		        "numUnread": 1,
		        "numReceived": 1,
		        "lastMessage": {
		            "senderToken": "eqq0Ktcj9W",
		            "receiverToken": "p9gKepeP5N",
		            "time": 1447455113827,
		            "locked": false,
		            "type": 0,
		            "seq": 1447455113827,
		            "msg": "Q: How many lawyers does it take to change a light bulb? A: You won't find a lawyer who can change a light bulb.  Now, if  you're looking for a lawyer to screw a light bulb...",
		            "readAt": 0
		        },
		        "hasPushNotificationDevice": 1,
		        "lastProcessedSeq": 0
		    },
		    {
		        "name": "User358649",
		        "age": 30,
		        "VIP": false,
		        "locked": false,
		        "photoURL": "http://d1qltpvz66ohy.cloudfront.net/user_photos/pictures/320591/small/2redbeans-ddde100b11cdfd8a522df14582329834cf68b103.jpg",
		        "location": "Dublin, CA, United States",
		        "token": "GLsNTrVnMQ",
		        "numUnread": 1,
		        "numReceived": 2,
		        "lastMessage": {
		            "senderToken": "GLsNTrVnMQ",
		            "receiverToken": "p9gKepeP5N",
		            "time": 1447454572538,
		            "locked": false,
		            "type": 0,
		            "seq": 1447454572538,
		            "msg": "You will be recognized and honored as a community leader.",
		            "readAt": 0
		        },
		        "hasPushNotificationDevice": 1,
		        "lastProcessedSeq": 0
		    },
		    {
		        "name": "User468167",
		        "age": 31,
		        "VIP": true,
		        "locked": false,
		        "photoURL": "http://d1qltpvz66ohy.cloudfront.net/user_photos/pictures/540490/small/2redbeans-6708fce8a7e4800bc3f406568f77aa2b54ed2ff5.jpg",
		        "location": "Grapevine, TX, United States",
		        "token": "m81A2Kg9B5",
		        "numUnread": 1,
		        "numReceived": 1,
		        "lastMessage": {
		            "senderToken": "m81A2Kg9B5",
		            "receiverToken": "p9gKepeP5N",
		            "time": 1447454148901,
		            "locked": false,
		            "type": 0,
		            "seq": 1447454148901,
		            "msg": "You are destined to become the commandant of the fighting men of the department of transportation.",
		            "readAt": 0
		        },
		        "hasPushNotificationDevice": 0,
		        "lastProcessedSeq": 0
		    },
		    {
		        "name": "User566481",
		        "age": 26,
		        "VIP": false,
		        "locked": false,
		        "photoURL": "http://d1qltpvz66ohy.cloudfront.net/user_photos/pictures/620489/small/2redbeans-982d8e4a474490d6660c605b0fcc63e8e5373e9f.jpg",
		        "location": "San Francisco, CA, United States",
		        "token": "QozhXFJvMF",
		        "numUnread": 2,
		        "numReceived": 2,
		        "lastMessage": {
		            "senderToken": "QozhXFJvMF",
		            "receiverToken": "p9gKepeP5N",
		            "time": 1447453454613,
		            "locked": false,
		            "type": 0,
		            "seq": 1447453454613,
		            "msg": "You will be awarded the Nobel Peace Prize... posthumously.",
		            "readAt": 0
		        },
		        "hasPushNotificationDevice": 1,
		        "lastProcessedSeq": "1447445616386.0"
		    },
		    {
		        "name": "Lei4",
		        "age": 30,
		        "VIP": false,
		        "locked": true,
		        "photoURL": "http://d1qltpvz66ohy.cloudfront.net/user_photos/pictures/657920/small/2redbeans-testing-4ce51f6de974658f8398c5ef70ed95f33bb994e8.png",
		        "location": "San Jose, CA, United States",
		        "token": "jfnvTogVat",
		        "numUnread": 2,
		        "numReceived": 2,
		        "lastMessage": {
		            "senderToken": "jfnvTogVat",
		            "receiverToken": "p9gKepeP5N",
		            "time": 1447453316406,
		            "locked": false,
		            "type": 0,
		            "seq": 1447453316406,
		            "msg": "Q: What do you call a blind pre-historic animal? A: Diyathinkhesaurus.  Q: What do you call a blind pre-historic animal with a dog? A: Diyathinkhesaurus Rex.",
		            "readAt": 0
		        },
		        "hasPushNotificationDevice": 1,
		        "lastProcessedSeq": "1447446015889.0"
		    },
		    {
		        "name": "User570755",
		        "age": 52,
		        "VIP": true,
		        "locked": false,
		        "photoURL": "http://d1qltpvz66ohy.cloudfront.net/user_photos/pictures/618179/small/2redbeans-8c3654a3232c60c1075a47e823c135ce12bc434a.jpg",
		        "location": "Irvine, CA, United States",
		        "token": "G1AdiSQVXg",
		        "numUnread": 2,
		        "numReceived": 2,
		        "lastMessage": {
		            "senderToken": "G1AdiSQVXg",
		            "receiverToken": "p9gKepeP5N",
		            "time": 1447452924955,
		            "locked": false,
		            "type": 0,
		            "seq": 1447452924955,
		            "msg": "You will contract a rare disease.",
		            "readAt": 0
		        },
		        "hasPushNotificationDevice": 1,
		        "lastProcessedSeq": "1447271963830.0"
		    },
		    {
		        "name": "User7509",
		        "age": 48,
		        "VIP": true,
		        "locked": false,
		        "photoURL": "http://d1qltpvz66ohy.cloudfront.net/user_photos/pictures/26398/small/2redbeans-90b97bb460c97e317dba97da8f1b3a3c1ed09677.jpg",
		        "location": "Los Angeles, CA, United States",
		        "token": "Z1KQDEZZil",
		        "numUnread": 2,
		        "numReceived": 2,
		        "lastMessage": {
		            "senderToken": "Z1KQDEZZil",
		            "receiverToken": "p9gKepeP5N",
		            "time": 1447452887974,
		            "locked": false,
		            "type": 0,
		            "seq": 1447452887974,
		            "msg": "Today is what happened to yesterday.",
		            "readAt": 0
		        },
		        "hasPushNotificationDevice": 0,
		        "lastProcessedSeq": "1447271687512.0"
		    },
		    {
		        "name": "User578223",
		        "age": 34,
		        "VIP": false,
		        "locked": true,
		        "photoURL": "http://d1qltpvz66ohy.cloudfront.net/user_photos/pictures/630713/small/2redbeans-8750acfda60c9d722ae18682c0a6ca1390cdc379.jpg",
		        "location": "Vietnam",
		        "token": "yCmadMiSpK",
		        "numUnread": 1,
		        "numReceived": 1,
		        "lastMessage": {
		            "senderToken": "yCmadMiSpK",
		            "receiverToken": "p9gKepeP5N",
		            "time": 1447452384875,
		            "locked": false,
		            "type": 0,
		            "seq": 1447452384875,
		            "msg": "FORTUNE PROVIDES QUESTIONS FOR THE GREAT ANSWERS: #5 A: The Halls of Montezuma and the Shores of Tripoli. Q: Name two families whose kids won't join the Marines.",
		            "readAt": 0
		        },
		        "hasPushNotificationDevice": 0,
		        "lastProcessedSeq": 0
		    },
		    {
		        "name": "User26306",
		        "age": 27,
		        "VIP": true,
		        "locked": false,
		        "photoURL": "http://d1qltpvz66ohy.cloudfront.net/user_photos/pictures/348794/small/2redbeans-2b1127a35fca152b9f67a897c005dab94ed661ef.png",
		        "location": "Saint Louis, MO, United States",
		        "token": "Vr436D296A",
		        "numUnread": 1,
		        "numReceived": 1,
		        "lastMessage": {
		            "senderToken": "Vr436D296A",
		            "receiverToken": "p9gKepeP5N",
		            "time": 1447452262862,
		            "locked": false,
		            "type": 0,
		            "seq": 1447452262862,
		            "msg": "Extreme fear can neither fight nor fly.   -- William Shakespeare, &quot;The Rape of Lucrece&quot;",
		            "readAt": 0
		        },
		        "hasPushNotificationDevice": 0,
		        "lastProcessedSeq": 0
		    },
		    {
		        "name": "User585907",
		        "age": 54,
		        "VIP": false,
		        "locked": true,
		        "photoURL": "http://d1qltpvz66ohy.cloudfront.net/user_photos/pictures/655720/small/2redbeans-fd4b3ce5e45b86529e860670ffdb4906d82792a6.png",
		        "location": "San Ramon, CA, United States",
		        "token": "60ywV0K0MM",
		        "numUnread": 1,
		        "numReceived": 1,
		        "lastMessage": {
		            "senderToken": "60ywV0K0MM",
		            "receiverToken": "p9gKepeP5N",
		            "time": 1447451363151,
		            "locked": false,
		            "type": 0,
		            "seq": 1447451363151,
		            "msg": "You will become rich and famous unless you don't.",
		            "readAt": 0
		        },
		        "hasPushNotificationDevice": 0,
		        "lastProcessedSeq": 0
		    },
		    {
		        "name": "User460770",
		        "age": 34,
		        "VIP": true,
		        "locked": false,
		        "photoURL": "http://d1qltpvz66ohy.cloudfront.net/user_photos/pictures/442332/small/2redbeans-cbecb692337d149f91b447c33c1f5a168155e55b.jpg",
		        "location": "United Kingdom",
		        "token": "D6VOZIuv1L",
		        "numUnread": 1,
		        "numReceived": 1,
		        "lastMessage": {
		            "senderToken": "D6VOZIuv1L",
		            "receiverToken": "p9gKepeP5N",
		            "time": 1447450748865,
		            "locked": false,
		            "type": 0,
		            "seq": 1447450748865,
		            "msg": "Q: How do you shoot a blue elephant? A: With a blue-elephant gun.  Q: How do you shoot a pink elephant? A: Twist its trunk until it turns blue, then shoot it with  a blue-elephant gun.",
		            "readAt": 0
		        },
		        "hasPushNotificationDevice": 0,
		        "lastProcessedSeq": 0
		    },
		    {
		        "name": "User504698",
		        "age": 25,
		        "VIP": false,
		        "locked": true,
		        "photoURL": "http://d1qltpvz66ohy.cloudfront.net/user_photos/pictures/509112/small/2redbeans-0ac51c34a2b0d5af37d62bb845accd9c5e6d9c43.jpg",
		        "location": "San Diego, CA, United States",
		        "token": "zILlWuv460",
		        "numUnread": 1,
		        "numReceived": 1,
		        "lastMessage": {
		            "senderToken": "zILlWuv460",
		            "receiverToken": "p9gKepeP5N",
		            "time": 1447450208923,
		            "locked": false,
		            "type": 0,
		            "seq": 1447450208923,
		            "msg": "It is often the case that the man who can't tell a lie thinks he is the best judge of one.   -- Mark Twain, &quot;Pudd'nhead Wilson's Calendar&quot;",
		            "readAt": 0
		        },
		        "hasPushNotificationDevice": 1,
		        "lastProcessedSeq": 0
		    },
		    {
		        "name": "User65609",
		        "age": 31,
		        "VIP": false,
		        "locked": true,
		        "photoURL": "http://d1qltpvz66ohy.cloudfront.net/user_photos/pictures/69544/small/2redbeans-191c01599dfa7d6310ab4f12e85cc8346b9b0be4.jpg",
		        "location": "Los Angeles, CA, United States",
		        "token": "NqP34VYY1E",
		        "numUnread": 0,
		        "numReceived": 1,
		        "lastMessage": {
		            "senderToken": "NqP34VYY1E",
		            "receiverToken": "p9gKepeP5N",
		            "time": 1447449653923,
		            "locked": false,
		            "type": 0,
		            "seq": 1447449653923,
		            "msg": "You worry too much about your job.  Stop it.  You are not paid enough to worry.",
		            "readAt": 1448494975100
		        },
		        "hasPushNotificationDevice": 1,
		        "lastProcessedSeq": 0
		    },
		    {
		        "name": "User588461",
		        "age": 37,
		        "VIP": false,
		        "locked": true,
		        "photoURL": "http://d1qltpvz66ohy.cloudfront.net/user_photos/pictures/649570/small/2redbeans-ff75ef2f9db07c958e8e9460e3cee826d6eb5bc7.jpg",
		        "location": "Pleasanton, CA, United States",
		        "token": "K5brHxmox1",
		        "numUnread": 1,
		        "numReceived": 1,
		        "lastMessage": {
		            "senderToken": "K5brHxmox1",
		            "receiverToken": "p9gKepeP5N",
		            "time": 1447449188610,
		            "locked": false,
		            "type": 0,
		            "seq": 1447449188610,
		            "msg": "Q: How many bureaucrats does it take to screw in a light bulb? A: Two.  One to assure everyone that everything possible is being  done while the other screws the bulb into the water faucet.",
		            "readAt": 0
		        },
		        "hasPushNotificationDevice": 1,
		        "lastProcessedSeq": "1447449188610.0"
		    },
		    {
		        "name": "User414264",
		        "age": 25,
		        "VIP": false,
		        "locked": true,
		        "photoURL": "http://d1qltpvz66ohy.cloudfront.net/user_photos/pictures/402611/small/2redbeans-797e40c6281fe749830d2f1b5f4382684035116b.jpg",
		        "location": "Philadelphia, PA, United States",
		        "token": "AhApyGgJgx",
		        "numUnread": 1,
		        "numReceived": 1,
		        "lastMessage": {
		            "senderToken": "AhApyGgJgx",
		            "receiverToken": "p9gKepeP5N",
		            "time": 1447449167467,
		            "locked": false,
		            "type": 0,
		            "seq": 1447449167467,
		            "msg": "Lay on, MacDuff, and curs'd be him who first cries, &quot;Hold, enough!&quot;.   -- Shakespeare",
		            "readAt": 0
		        },
		        "hasPushNotificationDevice": 1,
		        "lastProcessedSeq": "1447449167467.0"
		    }
		]
	},
	outbox: 
	{
		isFetching: false,
		nextOutboxPeerSeq: '',
		noMoreOutboxPeers: false,
		peers: [
		    {
		        "name": "no name",
		        "age": 30,
		        "VIP": true,
		        "locked": false,
		        "photoURL": "http://testing.2redbeans.com/images/no_photo_small.png",
		        "location": "United States",
		        "token": "PdWtHj6LYz",
		        "numUnread": 0,
		        "numReceived": 0,
		        "lastMessage": {
		            "senderToken": "p9gKepeP5N",
		            "receiverToken": "PdWtHj6LYz",
		            "time": 1447442334433,
		            "locked": false,
		            "type": 0,
		            "seq": 1447442334433,
		            "msg": "Big book, big bore.   -- Callimachus"
		        },
		        "hasPushNotificationDevice": 1,
		        "lastProcessedSeq": 0
		    },
		    {
		        "name": "kko",
		        "age": 30,
		        "VIP": false,
		        "locked": true,
		        "photoURL": "http://d1qltpvz66ohy.cloudfront.net/user_photos/pictures/657974/small/2redbeans-testing-96aaf6079a9abf66c2cc535002789df87f39b430.jpg",
		        "location": "San Francisco, CA, United States",
		        "token": "gQY2JVNtjF",
		        "numUnread": 0,
		        "numReceived": 0,
		        "lastMessage": {
		            "senderToken": "p9gKepeP5N",
		            "receiverToken": "gQY2JVNtjF",
		            "time": 1447285225695,
		            "locked": false,
		            "type": 0,
		            "seq": 1447285225695,
		            "msg": "You have an ability to sense and know higher truth."
		        },
		        "hasPushNotificationDevice": 1,
		        "lastProcessedSeq": 0
		    },
		    {
		        "name": "11",
		        "age": 30,
		        "VIP": false,
		        "locked": true,
		        "photoURL": "http://d1qltpvz66ohy.cloudfront.net/user_photos/pictures/657950/small/2redbeans-testing-d112544b8b1280c8b36252f25d86ad1f0a029a6b.jpg",
		        "location": "United States",
		        "token": "VIXOmAnbRJ",
		        "numUnread": 0,
		        "numReceived": 0,
		        "lastMessage": {
		            "senderToken": "p9gKepeP5N",
		            "receiverToken": "VIXOmAnbRJ",
		            "time": 1447284282406,
		            "locked": false,
		            "type": 0,
		            "seq": 1447284282406,
		            "msg": "I think we are in Rats' Alley where the dead men lost their bones.   -- T.S. Eliot"
		        },
		        "hasPushNotificationDevice": 1,
		        "lastProcessedSeq": 0
		    },
		    {
		        "name": "Luke",
		        "age": 30,
		        "VIP": false,
		        "locked": true,
		        "photoURL": "http://d1qltpvz66ohy.cloudfront.net/user_photos/pictures/657944/small/2redbeans-testing-dddd03d8c4eaf37286c599cdb5fb1eb3548f29d0.jpg",
		        "location": "San Francisco, CA, United States",
		        "token": "miBmUw6mb6",
		        "numUnread": 0,
		        "numReceived": 0,
		        "lastMessage": {
		            "senderToken": "p9gKepeP5N",
		            "receiverToken": "miBmUw6mb6",
		            "time": 1447275629764,
		            "locked": false,
		            "type": 0,
		            "seq": 1447275629764,
		            "msg": "Never laugh at live dragons.   -- Bilbo Baggins [J.R.R. Tolkien, &quot;The Hobbit&quot;]"
		        },
		        "hasPushNotificationDevice": 1,
		        "lastProcessedSeq": 0
		    },
		    {
		        "name": "daddies",
		        "age": 30,
		        "VIP": false,
		        "locked": false,
		        "photoURL": "http://d1qltpvz66ohy.cloudfront.net/user_photos/pictures/658007/small/2redbeans-testing-91e1a2b6bee4f8c2e217c0dd2a0884dcc7166606.jpg",
		        "location": "San Jose, CA, United States",
		        "token": "183ID4cuoW",
		        "numUnread": 0,
		        "numReceived": 0,
		        "lastMessage": {
		            "senderToken": "p9gKepeP5N",
		            "receiverToken": "183ID4cuoW",
		            "time": 1447272964427,
		            "locked": false,
		            "type": 0,
		            "seq": 1447272964427,
		            "msg": "You will not be elected to public office this year."
		        },
		        "hasPushNotificationDevice": 1,
		        "lastProcessedSeq": 0
		    },
		    {
		        "name": "Lei2",
		        "age": 30,
		        "VIP": false,
		        "locked": true,
		        "photoURL": "http://d1qltpvz66ohy.cloudfront.net/user_photos/pictures/657921/small/2redbeans-testing-557d223898c514d2e5da5063bbc2f302b10ccb87.png",
		        "location": "San Jose, CA, United States",
		        "token": "mhoV1V2GCN",
		        "numUnread": 0,
		        "numReceived": 0,
		        "lastMessage": {
		            "senderToken": "p9gKepeP5N",
		            "receiverToken": "mhoV1V2GCN",
		            "time": 1447272129711,
		            "locked": false,
		            "type": 0,
		            "seq": 1447272129711,
		            "msg": "You're a card which will have to be dealt with."
		        },
		        "hasPushNotificationDevice": 1,
		        "lastProcessedSeq": 0
		    },
		    {
		        "name": "朴",
		        "age": 29,
		        "VIP": false,
		        "locked": true,
		        "photoURL": "http://testing.2redbeans.com/images/no_photo_small.png",
		        "location": "San Ramon, CA, United States",
		        "token": "iWHr0xzZtI",
		        "numUnread": 0,
		        "numReceived": 0,
		        "lastMessage": {
		            "senderToken": "p9gKepeP5N",
		            "receiverToken": "iWHr0xzZtI",
		            "time": 1447271719538,
		            "locked": false,
		            "type": 0,
		            "seq": 1447271719538,
		            "msg": "He draweth out the thread of his verbosity finer than the staple of his argument.   -- William Shakespeare, &quot;Love's Labour's Lost&quot;"
		        },
		        "hasPushNotificationDevice": 1,
		        "lastProcessedSeq": 0
		    }
		]
	},
	messages : {
		"5Fg71dMs8C" : [
		    {
		        "senderToken": "p9gKepeP5N",
		        "receiverToken": "5Fg71dMs8C",
		        "time": 1448912690783,
		        "locked": true,
		        "type": 0,
		        "seq": 1448912690783,
		        "msg": "Hashtag viral vinyl, chicharrones jean shorts aesthetic waistcoat messenger bag actually. Mixtape chartreuse semiotics, wayfarers normcore beard DIY celiac. Pickled fanny pack flannel kogi, sriracha franzen semiotics chicharrones cronut pug offal jean shorts."
		    },
		    {
		        "senderToken": "5Fg71dMs8C",
		        "receiverToken": "p9gKepeP5N",
		        "time": 1448912689544,
		        "locked": false,
		        "type": 0,
		        "seq": 1448912689544,
		        "msg": "Meditation everyday carry godard, single-origin coffee locavore twee portland cronut ramps swag bushwick. Shoreditch heirloom brooklyn, humblebrag ethical food truck bicycle rights direct trade pug migas chicharrones vinyl banjo. Direct trade shoreditch street art green juice chia. IPhone cred tumblr, DIY keffiyeh lomo readymade taxidermy mumblecore chartreuse."
		    },
		    {
		        "senderToken": "p9gKepeP5N",
		        "receiverToken": "5Fg71dMs8C",
		        "time": 1448912688563,
		        "locked": true,
		        "type": 0,
		        "seq": 1448912688563,
		        "msg": "Freegan YOLO fanny pack, vegan pop-up pork belly brooklyn. Direct trade kale chips retro skateboard crucifix, brooklyn echo park health goth. Helvetica intelligentsia photo booth microdosing meh gastropub bicycle rights occupy. Semiotics +1 small batch tacos."
		    },
		    {
		        "senderToken": "p9gKepeP5N",
		        "receiverToken": "5Fg71dMs8C",
		        "time": 1448912687731,
		        "locked": true,
		        "type": 0,
		        "seq": 1448912687731,
		        "msg": "34"
		    },
		    {
		        "senderToken": "5Fg71dMs8C",
		        "receiverToken": "p9gKepeP5N",
		        "time": 1448912686897,
		        "locked": false,
		        "type": 0,
		        "seq": 1448912686897,
		        "msg": "Polaroid portland pour-over swag, locavore pabst mustache truffaut aesthetic forage cliche. Farm-to-table shabby chic selvage, letterpress kinfolk pinterest kale chips microdosing artisan. Pabst art party shabby chic, dreamcatcher gentrify roof party chambray venmo marfa blog."
		    },
		    {
		        "senderToken": "p9gKepeP5N",
		        "receiverToken": "5Fg71dMs8C",
		        "time": 1448912686310,
		        "locked": true,
		        "type": 0,
		        "seq": 1448912686310,
		        "msg": "Freegan YOLO fanny pack, vegan pop-up pork belly brooklyn. Direct trade kale chips retro skateboard crucifix, brooklyn echo park health goth. Helvetica intelligentsia photo booth microdosing meh gastropub bicycle rights occupy. Semiotics +1 small batch tacos."
		    },
		    {
		        "senderToken": "p9gKepeP5N",
		        "receiverToken": "5Fg71dMs8C",
		        "time": 1448912685588,
		        "locked": true,
		        "type": 0,
		        "seq": 1448912685588,
		        "msg": "31"
		    },
		    {
		        "senderToken": "p9gKepeP5N",
		        "receiverToken": "5Fg71dMs8C",
		        "time": 1448912684881,
		        "locked": true,
		        "type": 0,
		        "seq": 1448912684881,
		        "msg": "30"
		    },
		    {
		        "senderToken": "p9gKepeP5N",
		        "receiverToken": "5Fg71dMs8C",
		        "time": 1448912684057,
		        "locked": true,
		        "type": 0,
		        "seq": 1448912684057,
		        "msg": "29"
		    },
		    {
		        "senderToken": "5Fg71dMs8C",
		        "receiverToken": "p9gKepeP5N",
		        "time": 1448912682923,
		        "locked": true,
		        "type": 0,
		        "seq": 1448912682923,
		        "msg": "28"
		    },
		    {
		        "senderToken": "p9gKepeP5N",
		        "receiverToken": "5Fg71dMs8C",
		        "time": 1448912681729,
		        "locked": true,
		        "type": 0,
		        "seq": 1448912681729,
		        "msg": "27"
		    },
		    {
		        "senderToken": "p9gKepeP5N",
		        "receiverToken": "5Fg71dMs8C",
		        "time": 1448912679665,
		        "locked": true,
		        "type": 0,
		        "seq": 1448912679665,
		        "msg": "26"
		    },
		    {
		        "senderToken": "p9gKepeP5N",
		        "receiverToken": "5Fg71dMs8C",
		        "time": 1448912678612,
		        "locked": true,
		        "type": 0,
		        "seq": 1448912678612,
		        "msg": "25"
		    },
		    {
		        "senderToken": "p9gKepeP5N",
		        "receiverToken": "5Fg71dMs8C",
		        "time": 1448912677706,
		        "locked": true,
		        "type": 0,
		        "seq": 1448912677706,
		        "msg": "24"
		    },
		    {
		        "senderToken": "p9gKepeP5N",
		        "receiverToken": "5Fg71dMs8C",
		        "time": 1448912676877,
		        "locked": true,
		        "type": 0,
		        "seq": 1448912676877,
		        "msg": "23"
		    },
		    {
		        "senderToken": "p9gKepeP5N",
		        "receiverToken": "5Fg71dMs8C",
		        "time": 1448912676089,
		        "locked": true,
		        "type": 0,
		        "seq": 1448912676089,
		        "msg": "22"
		    },
		    {
		        "senderToken": "p9gKepeP5N",
		        "receiverToken": "5Fg71dMs8C",
		        "time": 1448912674406,
		        "locked": true,
		        "type": 0,
		        "seq": 1448912674406,
		        "msg": "21"
		    },
		    {
		        "senderToken": "p9gKepeP5N",
		        "receiverToken": "5Fg71dMs8C",
		        "time": 1448912672964,
		        "locked": true,
		        "type": 0,
		        "seq": 1448912672964,
		        "msg": "20"
		    },
		    {
		        "senderToken": "p9gKepeP5N",
		        "receiverToken": "5Fg71dMs8C",
		        "time": 1448912672417,
		        "locked": true,
		        "type": 0,
		        "seq": 1448912672417,
		        "msg": "Freegan YOLO fanny pack, vegan pop-up pork belly brooklyn. Direct trade kale chips retro skateboard crucifix, brooklyn echo park health goth. Helvetica intelligentsia photo booth microdosing meh gastropub bicycle rights occupy. Semiotics +1 small batch tacos."
		    },
		    {
		        "senderToken": "p9gKepeP5N",
		        "receiverToken": "5Fg71dMs8C",
		        "time": 1448912671658,
		        "locked": true,
		        "type": 0,
		        "seq": 1448912671658,
		        "msg": "Hashtag viral vinyl, chicharrones jean shorts aesthetic waistcoat messenger bag actually. Mixtape chartreuse semiotics, wayfarers normcore beard DIY celiac. Pickled fanny pack flannel kogi, sriracha franzen semiotics chicharrones cronut pug offal jean shorts."
		    }
		]
	}
};

module.exports = fakeState