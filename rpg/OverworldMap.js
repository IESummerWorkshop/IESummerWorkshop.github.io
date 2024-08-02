class OverworldMap{
    constructor(config){
        this.overworld = null;
        this.gameObjects = config.gameObjects;
        this.cutsceneSpaces = config.cutsceneSpaces || {};
        this.walls = config.walls || {};

        this.lowerImage = new Image();
        this.lowerImage.src = config.lowerSrc;

        this.upperImage = new Image();
        this.upperImage.src = config.upperSrc;

        this.isCutscenePlaying = false;
    }

    drawLowerImage(ctx, cameraPerson){
        ctx.drawImage(
            this.lowerImage,   
            utils.withGrid(10.5) - cameraPerson.x,
            utils.withGrid(6) - cameraPerson.y
        )
    }

    drawUpperImage(ctx, cameraPerson){
        ctx.drawImage(
            this.upperImage,
            utils.withGrid(10.5) - cameraPerson.x,
            utils.withGrid(6) - cameraPerson.y
        )
    }

    isSpaceTaken(currentX, currentY, direction){
        const {x,y} = utils.nextPosition(currentX, currentY, direction);
        return this.walls[`${x},${y}`] || false;
    }

    mountObjects(){
        Object.keys(this.gameObjects).forEach(key => {

            let object = this.gameObjects[key];
            object.id = key;

            //TODO: determine if this object should actually mount
            object.mount(this);
        })
    }

    async startCutscene(events){
        this.isCutscenePlaying = true;

        //Start a loop of async events
        //await each one
        for(let i = 0; i < events.length; i++){
            const eventHandler = new OverworldEvent({
                event: events[i],
                map: this, 
            });
            const result = await eventHandler.init();
            console.log("result: "+ result)
            if (result === "") {
                break;
            }
        }

        this.isCutscenePlaying = false;

        //Reset NPCs to do their idle behavior
        Object.values(this.gameObjects).forEach(object => object.doBehaviorEvent(this));
    }

    checkForActionCutscene() {
        const hero = this.gameObjects["hero"];
        const nextCoords = utils.nextPosition(hero.x, hero.y, hero.direction);
        const match = Object.values(this.gameObjects).find(object => {
          return `${object.x},${object.y}` === `${nextCoords.x},${nextCoords.y}`
        });
        if (!this.isCutscenePlaying && match && match.talking.length) {
    
          const relevantScenario = match.talking.find(scenario => {
            return (scenario.required || []).every(sf => {
              return playerState.storyFlags[sf]
            })
          })
          relevantScenario && this.startCutscene(relevantScenario.events)
        }
      }

    checkForFootstepCutscene() {
        const hero = this.gameObjects["hero"];
        const match = this.cutsceneSpaces[`${hero.x},${hero.y}`];
        if (!this.isCutscenePlaying && match){
            this.startCutscene(match[0].events);
        }
    }

    addWall(x,y){
        this.walls[`${x},${y}`] = true;
    }
    removeWall(x,y){
        delete this.walls[`${x},${y}`]
    }
    moveWall(wasX, wasY, direction){
        this.removeWall(wasX, wasY);
        const {x,y} = utils.nextPosition(wasX, wasY, direction);
        this.addWall(x,y);
    }
}

window.OverworldMaps = {
    DemoRoom: {
        lowerSrc: "./images/maps/DemoLower.png",
        upperSrc: "./images/maps/DemoUpper.png",
        gameObjects: {
            hero: new Person({
                isPlayerControlled: true,
                x: utils.withGrid(5),
                y: utils.withGrid(6),
            }),
            npcA: new Person({
                x: utils.withGrid(7),
                y: utils.withGrid(9),
                src: "./images/characters/people/npc1.png",
                behaviorLoop: [
                    { type: "stand", direction: "left", time: 800},
                    { type: "stand", direction: "up", time: 800 },
                    { type: "stand", direction: "right", time: 1200 },
                    { type: "stand", direction: "up", time: 300 },
                ],
                talking: [
                    {
                        events: [
                            { type: "textMessage", text: "I am busy!", faceHero: "npcA"},
                            { type: "textMessage", text: "Go away!"},
                            { who: "hero", type: "walk", direction: "up"},
                        ]
                    },
                ]
            }),
            npcB: new Person({
                x: utils.withGrid(8),
                y: utils.withGrid(5),
                src: "./images/characters/people/npc2.png",
                // behaviorLoop: [
                //     { type: "walk", direction: "left"},
                //     { type: "stand", direction: "up", time: 800 },
                //     { type: "walk", direction: "up"},
                //     { type: "walk", direction: "right"},
                //     { type: "walk", direction: "down"},
                // ]
            }),
        },
        walls: {
            //"16,16": true
            [utils.asGridCoord(7,6)]: true,
            [utils.asGridCoord(8,6)]: true,
            [utils.asGridCoord(7,7)]: true,
            [utils.asGridCoord(8,7)]: true,
        },
        cutsceneSpaces: {
            [utils.asGridCoord(7,4)]: [
                {
                    events: [
                        {who: "npcB", type: "walk", direction: "left"},
                        {who: "npcB", type: "stand", direction: "up", time: 500},
                        {type: "textMessage", text: "You can't be in there!"},
                        {who: "npcB", type: "walk", direction: "right"},
                        
                        {who: "hero", type: "walk", direction: "down"},
                        {who: "hero", type: "walk", direction: "left"},
                    ]
                }
            ],
            [utils.asGridCoord(5, 10)]: [
                {
                    events: [
                        {type: "changeMap", map: "Kitchen", link: "../py-lab.html?question=1"}
                    ]
                }
            ]
        }

    },
    Kitchen: {
        lowerSrc: "./images/maps/KitchenLower.png",
        upperSrc: "./images/maps/KitchenUpper.png",
        gameObjects: {
            hero: new Person({
                isPlayerControlled: true,
                x: utils.withGrid(5),
                y: utils.withGrid(5),
            }),
            npcB: new Person({
                x: utils.withGrid(10),
                y: utils.withGrid(8),
                src: "./images/characters/people/npc3.png",
                talking:[
                    {
                        events: [
                            { type: "textMessage", text: "hiiiiiiiiii!", faceHero: "npcB" },
                        ]
                    }
                ]
            })
        }
    },
    ClassRoom_2: {
        lowerSrc: "./images/maps/ClassRoom_v2.png",
        upperSrc: "./images/maps/ClassRoom_v2_upper.png",
        gameObjects: {
            hero: new Person({
                isPlayerControlled: true,
                x: utils.withGrid(5),
                y: utils.withGrid(6),
            }),
            npcB: new Person({
                x: utils.withGrid(2),
                y: utils.withGrid(2),
                src: "./images/characters/people/npc2.png",
                talking: [
                    {   
                        required: ["7N9WBG6WJ2"],
                        events: [
                            { type: "textMessage", text: "You finished lab 1", faceHero: "npcB" },
                           // { who: "npcB", type: "walk", direction: "right" }
                        ]
                    },
                    {
                        events: [
                            // { type: "textMessage", text: "IE Technician: You haven't finish the lab!", faceHero: "npcB"},
                            // { type: "textMessage", text: "IE Technician: Stay here!"},
                            { type: "flagMenu"},
                            //{ type: "addStoryFlag", flag: "lab1"},
                            // {who: "hero", type: "walk", direction: "down"},
                        ]
                    },
                ]
            }),
            lab1: new Items({
                x: utils.withGrid(6),
                y: utils.withGrid(5),
                src: "",
                talking: [
                    {
                        events: [
                            { type: "textMessage", text: "This is Python Lab 1."},
                            { type: "selectionMenu", lab: "1", link: "../py-lab.html?question=1"},
                            //{ type: "openLink", link: "../py-lab.html?question=1" }
                        ]
                    },
                ]
            }),
            lab2: new Items({
                x: utils.withGrid(9),
                y: utils.withGrid(5),
                src: "",
                talking: [
                    {
                        events: [
                            { type: "textMessage", text: "This is Python Lab 2."},
                            { type: "selectionMenu", lab: "2", link: "../py-lab.html?question=2"},
                        ]
                    },
                ]
            }),
            lab3: new Items({
                x: utils.withGrid(3),
                y: utils.withGrid(8),
                src: "",
                talking: [
                    {
                        events: [
                            { type: "textMessage", text: "This is Python Lab 3."},
                            { type: "selectionMenu", lab: "3", link: "../py-lab.html?question=3"},
                        ]
                    },
                ]
            }),
            lab4: new Items({
                x: utils.withGrid(12),
                y: utils.withGrid(11),
                src: "",
                talking: [
                    {
                        events: [
                            { type: "textMessage", text: "This is Python Lab 4."},
                            { type: "selectionMenu", lab: "4", link: "../py-lab.html?question=4"},
                        ]
                    },
                ]
            }),
            
        },
        cutsceneSpaces: {
            // [utils.asGridCoord(2,2)]: [
            //     {
            //         events: [
            //             {type: "textMessage", text: "You can't be in there!"},                        
            //             {who: "hero", type: "walk", direction: "down"},
            //             {who: "hero", type: "walk", direction: "right"},
            //         ]
            //     }
            // ],
            // [utils.asGridCoord(9,4)]: [
            //     {
            //         events: [
            //             {type: "openLink",link: "../py-lab.html?question=1"}
            //         ]
            //     }
            // ],
            // [utils.asGridCoord(9,6)]: [
            //     {
            //         events: [
            //             {type: "openLink",link: "../py-lab.html?question=2"}
            //         ]
            //     }
            // ]
        },
        walls: {
            //Teacher Desk
            [utils.asGridCoord(5,3)]: true,
            [utils.asGridCoord(6,3)]: true,
            [utils.asGridCoord(7,3)]: true,
            [utils.asGridCoord(8,3)]: true,
            [utils.asGridCoord(9,3)]: true,
            [utils.asGridCoord(10,3)]: true,
     
            //First Row
            [utils.asGridCoord(2,5)]: true,
            [utils.asGridCoord(3,5)]: true,
            [utils.asGridCoord(4,5)]: true,
            [utils.asGridCoord(5,5)]: true,
            [utils.asGridCoord(6,5)]: true,
            [utils.asGridCoord(7,5)]: true,
            [utils.asGridCoord(8,5)]: true,
            [utils.asGridCoord(9,5)]: true,
            [utils.asGridCoord(10,5)]: true,
            [utils.asGridCoord(11,5)]: true,
            [utils.asGridCoord(12,5)]: true,
            [utils.asGridCoord(13,5)]: true,

            //Second Row
            [utils.asGridCoord(2,8)]: true,
            [utils.asGridCoord(3,8)]: true,
            [utils.asGridCoord(4,8)]: true,
            [utils.asGridCoord(5,8)]: true,
            [utils.asGridCoord(6,8)]: true,
            [utils.asGridCoord(7,8)]: true,
            [utils.asGridCoord(8,8)]: true,
            [utils.asGridCoord(9,8)]: true,
            [utils.asGridCoord(10,8)]: true,
            [utils.asGridCoord(11,8)]: true,
            [utils.asGridCoord(12,8)]: true,
            [utils.asGridCoord(13,8)]: true,
            
            //Third Row
            [utils.asGridCoord(2,11)]: true,
            [utils.asGridCoord(3,11)]: true,
            [utils.asGridCoord(4,11)]: true,
            [utils.asGridCoord(5,11)]: true,
            [utils.asGridCoord(6,11)]: true,
            [utils.asGridCoord(7,11)]: true,
            [utils.asGridCoord(8,11)]: true,
            [utils.asGridCoord(9,11)]: true,
            [utils.asGridCoord(10,11)]: true,
            [utils.asGridCoord(11,11)]: true,
            [utils.asGridCoord(12,11)]: true,
            [utils.asGridCoord(13,11)]: true,

            //Right Wall
            [utils.asGridCoord(15,0)]: true,
            [utils.asGridCoord(15,1)]: true,
            [utils.asGridCoord(15,2)]: true,
            [utils.asGridCoord(15,3)]: true,
            [utils.asGridCoord(15,4)]: true,
            [utils.asGridCoord(15,5)]: true,
            [utils.asGridCoord(15,6)]: true,
            [utils.asGridCoord(15,7)]: true,
            [utils.asGridCoord(15,8)]: true,
            [utils.asGridCoord(15,9)]: true,
            [utils.asGridCoord(15,10)]: true,
            [utils.asGridCoord(15,11)]: true,
            [utils.asGridCoord(15,12)]: true,
            [utils.asGridCoord(15,13)]: true,
            [utils.asGridCoord(15,14)]: true,
            [utils.asGridCoord(15,15)]: true,

            //Bottom Wall
            [utils.asGridCoord(0,15)]: true,
            [utils.asGridCoord(1,15)]: true,
            [utils.asGridCoord(2,15)]: true,
            [utils.asGridCoord(3,15)]: true,
            [utils.asGridCoord(4,15)]: true,
            [utils.asGridCoord(5,15)]: true,
            [utils.asGridCoord(6,15)]: true,
            [utils.asGridCoord(7,15)]: true,
            [utils.asGridCoord(8,15)]: true,
            [utils.asGridCoord(9,15)]: true,
            [utils.asGridCoord(10,15)]: true,
            [utils.asGridCoord(11,15)]: true,
            [utils.asGridCoord(12,15)]: true,
            [utils.asGridCoord(13,15)]: true,
            [utils.asGridCoord(14,15)]: true,
            [utils.asGridCoord(15,15)]: true,

            //Left Wall
            [utils.asGridCoord(0,0)]: true,
            [utils.asGridCoord(0,1)]: true,
            [utils.asGridCoord(0,2)]: true,
            [utils.asGridCoord(0,3)]: true,
            [utils.asGridCoord(0,4)]: true,
            [utils.asGridCoord(0,5)]: true,
            [utils.asGridCoord(0,6)]: true,
            [utils.asGridCoord(0,7)]: true,
            [utils.asGridCoord(0,8)]: true,
            [utils.asGridCoord(0,9)]: true,
            [utils.asGridCoord(0,10)]: true,
            [utils.asGridCoord(0,11)]: true,
            [utils.asGridCoord(0,12)]: true,
            [utils.asGridCoord(0,13)]: true,
            [utils.asGridCoord(0,14)]: true,
            [utils.asGridCoord(0,15)]: true,

            //Top Wall
            [utils.asGridCoord(0,0)]: true,
            [utils.asGridCoord(1,0)]: true,
            [utils.asGridCoord(2,0)]: true,
            [utils.asGridCoord(3,0)]: true,
            [utils.asGridCoord(4,0)]: true,
            [utils.asGridCoord(5,0)]: true,
            [utils.asGridCoord(6,0)]: true,
            [utils.asGridCoord(7,0)]: true,
            [utils.asGridCoord(8,0)]: true,
            [utils.asGridCoord(9,0)]: true,
            [utils.asGridCoord(10,0)]: true,
            [utils.asGridCoord(11,0)]: true,
            [utils.asGridCoord(12,0)]: true,
            [utils.asGridCoord(13,0)]: true,
            [utils.asGridCoord(14,0)]: true,
            [utils.asGridCoord(15,0)]: true,

            [utils.asGridCoord(0,1)]: true,
            [utils.asGridCoord(1,1)]: true,
            [utils.asGridCoord(2,1)]: true,
            [utils.asGridCoord(3,1)]: true,
            [utils.asGridCoord(4,1)]: true,
            [utils.asGridCoord(5,1)]: true,
            [utils.asGridCoord(6,1)]: true,
            [utils.asGridCoord(7,1)]: true,
            [utils.asGridCoord(8,1)]: true,
            [utils.asGridCoord(9,1)]: true,
            [utils.asGridCoord(10,1)]: true,
            [utils.asGridCoord(11,1)]: true,
            [utils.asGridCoord(12,1)]: true,
            [utils.asGridCoord(13,1)]: true,
            [utils.asGridCoord(14,1)]: true,
            [utils.asGridCoord(15,1)]: true,
        },
    },
    Day1: {
        lowerSrc: "./images/maps/Full_Map_day3.png",
        upperSrc: "./images/maps/Full_Map_Upper.png",
        gameObjects: {
            hero: new Person({
                isPlayerControlled: true,
                x: utils.withGrid(40),
                y: utils.withGrid(25),
            }),
            npcB: new Person({
                x: utils.withGrid(2),
                y: utils.withGrid(2),
                src: "./images/characters/people/npc2.png",
                talking: [
                    {   
                        required: ["7N9WBG6WJ2"],
                        events: [
                            { type: "textMessage", text: "You finished lab 1", faceHero: "npcB" },
                           // { who: "npcB", type: "walk", direction: "right" }
                        ]
                    },
                    {
                        events: [
                            // { type: "textMessage", text: "IE Technician: You haven't finish the lab!", faceHero: "npcB"},
                            // { type: "textMessage", text: "IE Technician: Stay here!"},
                            { type: "flagMenu"},
                            //{ type: "addStoryFlag", flag: "lab1"},
                            // {who: "hero", type: "walk", direction: "down"},
                        ]
                    },
                ]
            }),
            flag_submission_lab_12: new Items({
                x: utils.withGrid(45),
                y: utils.withGrid(29),
                src: "",
                talking: [
                    {
                        events: [
                            { type: "selectionMenu", lab: "Submit your key for lab 1 and 2", link: "../key-submission.html?submit=1"},
                        ]
                    },
                ]
            }),
            flag_submission_lab_34: new Items({
                x: utils.withGrid(55),
                y: utils.withGrid(25),
                src: "",
                talking: [
                    {
                        events: [
                            { type: "selectionMenu", lab: "Submit your key for lab 3 and 4", link: "../key-submission.html?submit=2"},
                        ]
                    },
                ]
            }),
            flag_submission_lab_56: new Items({
                x: utils.withGrid(25),
                y: utils.withGrid(24),
                src: "",
                talking: [
                    {
                        events: [
                            { type: "selectionMenu", lab: "Submit your key for lab 5 and 6", link: "../key-submission.html?submit=3"},
                        ]
                    },
                ]
            }),
            lab1_1: new Items({
                x: utils.withGrid(34),
                y: utils.withGrid(35),
                src: "",
                talking: [
                    {
                        events: [
                            { type: "textMessage", text: "This is Python Lab [Area of Circle]."},
                            { type: "selectionMenu", lab: "Open the lab", link: "../py-lab.html?question=1"},
                        ]
                    },
                ]
            }),
            lab1_2: new Items({
                x: utils.withGrid(44),
                y: utils.withGrid(35),
                src: "",
                talking: [
                    {
                        events: [
                            { type: "textMessage", text: "This is Python Lab [Sphinx's Riddle]."},
                            { type: "selectionMenu", lab: "Open the lab", link: "../py-lab.html?question=2"},
                        ]
                    },
                ]
            }),
            lab1_3: new Items({
                x: utils.withGrid(45),
                y: utils.withGrid(42),
                src: "",
                talking: [
                    {
                        events: [
                            { type: "textMessage", text: "This is Python Lab [Prime Number]."},
                            { type: "selectionMenu", lab: "Open the lab", link: "../py-lab.html?question=3"},
                        ]
                    },
                ]
            }),
            lab2_1: new Items({
                x: utils.withGrid(38),
                y: utils.withGrid(6),
                src: "",
                talking: [
                    {
                        events: [
                            { type: "textMessage", text: "This is Python Lab [Base Conversion I]."},
                            { type: "selectionMenu", lab: "Open the lab", link: "../py-lab.html?question=4"},
                        ]
                    },
                ]
            }),
            lab2_2: new Items({
                x: utils.withGrid(41),
                y: utils.withGrid(9),
                src: "",
                talking: [
                    {
                        events: [
                            { type: "textMessage", text: "This is Python Lab [Base Conversion II]."},
                            { type: "selectionMenu", lab: "Open the lab", link: "../py-lab.html?question=5"},
                        ]
                    },
                ]
            }),
            lab2_3: new Items({
                x: utils.withGrid(35),
                y: utils.withGrid(12),
                src: "",
                talking: [
                    {
                        events: [
                            { type: "textMessage", text: "This is Python Lab [Base conversion III]."},
                            { type: "selectionMenu", lab: "Open the lab", link: "../py-lab.html?question=10"},
                        ]
                    },
                ]
            }),
            lab2_4: new Items({
                x: utils.withGrid(44),
                y: utils.withGrid(12),
                src: "",
                talking: [
                    {
                        events: [
                            { type: "textMessage", text: "This is Python Lab [Base Conversion IV]."},
                            { type: "selectionMenu", lab: "Open the lab", link: "../py-lab.html?question=6"},
                        ]
                    },
                ]
            }),
            lab3_1: new Items({
                x: utils.withGrid(61),
                y: utils.withGrid(23),
                src: "",
                talking: [
                    {
                        events: [
                            { type: "textMessage", text: "This is Frequency Analysis."},
                            { type: "selectionMenu", lab: "Open the lab", link: "../frequency-analysis.html"},
                        ]
                    },
                ]
            }),
            lab3_2: new Items({
                x: utils.withGrid(70),
                y: utils.withGrid(23),
                src: "",
                talking: [
                    {
                        events: [
                            { type: "textMessage", text: "This is Caesar Cipher Encoding."},
                            { type: "selectionMenu", lab: "Open the lab", link: "../py-lab.html?question=7"},
                        ]
                    },
                ]
            }),
            lab4_1: new Items({
                x: utils.withGrid(69),
                y: utils.withGrid(18),
                src: "",
                talking: [
                    {
                        events: [
                            { type: "textMessage", text: "This is Breaking LCG PRNG."},
                            { type: "selectionMenu", lab: "Open the lab", link: "../py-lab.html?question=8"},
                        ]
                    },
                ]
            }),
            lab4_2: new Items({
                x: utils.withGrid(71),
                y: utils.withGrid(18),
                src: "",
                talking: [
                    {
                        events: [
                            { type: "textMessage", text: "This is AES Decryption."},
                            { type: "selectionMenu", lab: "Open the lab", link: "../py-lab.html?question=9"},
                        ]
                    },
                ]
            }),
            lab5_left: new Items({
                x: utils.withGrid(21),
                y: utils.withGrid(11),
                src: "",
                talking: [
                    {
                        events: [
                            { type: "textMessage", text: "This is XSS."},
                            { type: "selectionMenu", lab: "Open the lab", link: "../xss-lab.html"},
                        ]
                    },
                ]
            }),
            lab5_right: new Items({
                x: utils.withGrid(22),
                y: utils.withGrid(11),
                src: "",
                talking: [
                    {
                        events: [
                            { type: "textMessage", text: "This is XSS."},
                            { type: "selectionMenu", lab: "Open the lab", link: "../xss-lab.html"},
                        ]
                    },
                ]
            }),
            lab6_1: new Items({
                x: utils.withGrid(14),
                y: utils.withGrid(13),
                src: "",
                talking: [
                    {
                        events: [
                            { type: "textMessage", text: "This is SQL Injection."},
                            { type: "selectionMenu", lab: "Open the lab", link: "../shopping.html"},
                        ]
                    },
                ]
            }),
            lab6_2: new Items({
                x: utils.withGrid(17),
                y: utils.withGrid(13),
                src: "",
                talking: [
                    {
                        events: [
                            { type: "textMessage", text: "This is Buffer Overflow."},
                            { type: "selectionMenu", lab: "Open the lab", link: "https://www.programiz.com/online-compiler/2Cca581JYpIwj"},
                        ]
                    },
                ]
            }),
            /***  Other Items ***/
            basketball: new Items({
                x: utils.withGrid(12),
                y: utils.withGrid(17),
                src: "",
                talking: [
                    {
                        events: [
                            { type: "textMessage", text: "This is a basketball."},
                        ]
                    },
                ]
            }),
            pic_santa: new Items({
                x: utils.withGrid(29),
                y: utils.withGrid(22),
                src: "",
                talking: [
                    {
                        events: [
                            { type: "textMessage", text: "This is Santa Claus."},
                        ]
                    },
                ]
            }),
            info_board_left: new Items({
                x: utils.withGrid(37),
                y: utils.withGrid(17),
                src: "",
                talking: [
                    {
                        events: [
                            { type: "textMessage", text: "Welcome to Fun with Information Engineering and Security!"},
                        ]
                    },
                ]
            }),
            info_board_right: new Items({
                x: utils.withGrid(38),
                y: utils.withGrid(17),
                src: "",
                talking: [
                    {
                        events: [
                            { type: "textMessage", text: "Welcome to Fun with Information Engineering and Security!"},
                        ]
                    },
                ]
            }),
            tv_left: new Items({
                x: utils.withGrid(41),
                y: utils.withGrid(17),
                src: "",
                talking: [
                    {
                        events: [
                            { type: "textMessage", text: "The TV is turned off."},
                        ]
                    },
                ]
            }),
            tv_right: new Items({
                x: utils.withGrid(42),
                y: utils.withGrid(17),
                src: "",
                talking: [
                    {
                        events: [
                            { type: "textMessage", text: "The TV is turned off."},
                        ]
                    },
                ]
            }),
            coffee_left: new Items({
                x: utils.withGrid(43),
                y: utils.withGrid(18),
                src: "",
                talking: [
                    {
                        events: [
                            { type: "textMessage", text: "Battery life of an engineer."},
                        ]
                    },
                ]
            }),
            coffee_right: new Items({
                x: utils.withGrid(44),
                y: utils.withGrid(18),
                src: "",
                talking: [
                    {
                        events: [
                            { type: "textMessage", text: "Battery life of an engineer."},
                        ]
                    },
                ]
            }),
            snacks_left: new Items({
                x: utils.withGrid(45),
                y: utils.withGrid(18),
                src: "",
                talking: [
                    {
                        events: [
                            { type: "textMessage", text: "Snacks."},
                        ]
                    },
                ]
            }),
            snacks_right: new Items({
                x: utils.withGrid(46),
                y: utils.withGrid(18),
                src: "",
                talking: [
                    {
                        events: [
                            { type: "textMessage", text: "Snacks."},
                        ]
                    },
                ]
            }),
        },
        cutsceneSpaces: {
            /***** Day 1 Block *****/
            // [utils.asGridCoord(48,24)]: [
            //     {
            //         events: [
            //             {type: "textMessage", text: "The area will open in Day 2!"},                        
            //             {who: "hero", type: "walk", direction: "left"},
            //         ]
            //     }
            // ],
            // [utils.asGridCoord(48,25)]: [
            //     {
            //         events: [
            //             {type: "textMessage", text: "The area will open in Day 2!"},                        
            //             {who: "hero", type: "walk", direction: "left"},
            //         ]
            //     }
            // ],
            /***** Day 2 Block *****/
            // [utils.asGridCoord(31,23)]: [
            //     {
            //         events: [
            //             {type: "textMessage", text: "The area will open in Day 3!"},                        
            //             {who: "hero", type: "walk", direction: "right"},
            //         ]
            //     }
            // ],
            // [utils.asGridCoord(31,24)]: [
            //     {
            //         events: [
            //             {type: "textMessage", text: "The area will open in Day 3!"},                        
            //             {who: "hero", type: "walk", direction: "right"},
            //         ]
            //     }
            // ],
            // [utils.asGridCoord(31,25)]: [
            //     {
            //         events: [
            //             {type: "textMessage", text: "The area will open in Day 3!"},                        
            //             {who: "hero", type: "walk", direction: "right"},
            //         ]
            //     }
            // ],
            // [utils.asGridCoord(31,26)]: [
            //     {
            //         events: [
            //             {type: "textMessage", text: "The area will open in Day 3!"},                        
            //             {who: "hero", type: "walk", direction: "right"},
            //         ]
            //     }
            // ],
        },
        walls: {
            /***** Day 1 Block *****/
            //[utils.asGridCoord(49,24)]: true,
            //[utils.asGridCoord(49,25)]: true,

            /***** Day 2 Block *****/
            // [utils.asGridCoord(30,23)]: true,
            // [utils.asGridCoord(30,24)]: true,
            // [utils.asGridCoord(30,25)]: true,
            // [utils.asGridCoord(30,26)]: true,


            /***************** Lab 1-2 & Center ***********************/
            [utils.asGridCoord(32,0)]: true,
            [utils.asGridCoord(32,1)]: true,
            [utils.asGridCoord(32,2)]: true,
            [utils.asGridCoord(32,3)]: true,
            [utils.asGridCoord(32,4)]: true,
            [utils.asGridCoord(32,5)]: true,
            [utils.asGridCoord(32,6)]: true,
            [utils.asGridCoord(32,7)]: true,
            [utils.asGridCoord(32,8)]: true,
            [utils.asGridCoord(32,9)]: true,
            [utils.asGridCoord(32,10)]: true,
            [utils.asGridCoord(32,11)]: true,
            [utils.asGridCoord(32,12)]: true,
            [utils.asGridCoord(32,13)]: true,
            [utils.asGridCoord(32,14)]: true,
            [utils.asGridCoord(32,15)]: true,
            [utils.asGridCoord(32,16)]: true,
            [utils.asGridCoord(32,17)]: true,
            [utils.asGridCoord(32,18)]: true,
            [utils.asGridCoord(32,19)]: true,
            [utils.asGridCoord(32,20)]: true,

            [utils.asGridCoord(32,0)]: true,
            [utils.asGridCoord(33,0)]: true,
            [utils.asGridCoord(34,0)]: true,
            [utils.asGridCoord(35,0)]: true,
            [utils.asGridCoord(36,0)]: true,
            [utils.asGridCoord(37,0)]: true,
            [utils.asGridCoord(38,0)]: true,
            [utils.asGridCoord(39,0)]: true,
            [utils.asGridCoord(40,0)]: true,
            [utils.asGridCoord(41,0)]: true,
            [utils.asGridCoord(42,0)]: true,
            [utils.asGridCoord(43,0)]: true,
            [utils.asGridCoord(44,0)]: true,
            [utils.asGridCoord(45,0)]: true,
            [utils.asGridCoord(46,0)]: true,
            [utils.asGridCoord(47,0)]: true,
            
            [utils.asGridCoord(32,1)]: true,
            [utils.asGridCoord(33,1)]: true,
            [utils.asGridCoord(34,1)]: true,
            [utils.asGridCoord(35,1)]: true,
            [utils.asGridCoord(36,1)]: true,
            [utils.asGridCoord(37,1)]: true,
            [utils.asGridCoord(38,1)]: true,
            [utils.asGridCoord(39,1)]: true,
            [utils.asGridCoord(40,1)]: true,
            [utils.asGridCoord(41,1)]: true,
            [utils.asGridCoord(42,1)]: true,
            [utils.asGridCoord(43,1)]: true,
            [utils.asGridCoord(44,1)]: true,
            [utils.asGridCoord(45,1)]: true,
            [utils.asGridCoord(46,1)]: true,
            [utils.asGridCoord(47,1)]: true,

            [utils.asGridCoord(47,0)]: true,
            [utils.asGridCoord(47,1)]: true,
            [utils.asGridCoord(47,2)]: true,
            [utils.asGridCoord(47,3)]: true,
            [utils.asGridCoord(47,4)]: true,
            [utils.asGridCoord(47,5)]: true,
            [utils.asGridCoord(47,6)]: true,
            [utils.asGridCoord(47,7)]: true,
            [utils.asGridCoord(47,8)]: true,
            [utils.asGridCoord(47,9)]: true,
            [utils.asGridCoord(47,10)]: true,
            [utils.asGridCoord(47,11)]: true,
            [utils.asGridCoord(47,12)]: true,
            [utils.asGridCoord(47,13)]: true,
            [utils.asGridCoord(47,14)]: true,
            [utils.asGridCoord(47,15)]: true,
            [utils.asGridCoord(47,16)]: true,
            [utils.asGridCoord(47,17)]: true,
            [utils.asGridCoord(47,18)]: true,
            [utils.asGridCoord(47,19)]: true,
            [utils.asGridCoord(47,20)]: true,
            [utils.asGridCoord(47,21)]: true,
            [utils.asGridCoord(47,22)]: true,
            [utils.asGridCoord(47,23)]: true,

            [utils.asGridCoord(33,16)]: true,
            [utils.asGridCoord(34,16)]: true,
            [utils.asGridCoord(35,16)]: true,
            [utils.asGridCoord(36,16)]: true,
            [utils.asGridCoord(37,16)]: true,
            [utils.asGridCoord(38,16)]: true,
            [utils.asGridCoord(41,16)]: true,
            [utils.asGridCoord(42,16)]: true,
            [utils.asGridCoord(43,16)]: true,
            [utils.asGridCoord(44,16)]: true,
            [utils.asGridCoord(45,16)]: true,
            [utils.asGridCoord(46,16)]: true,

            [utils.asGridCoord(33,17)]: true,
            [utils.asGridCoord(34,17)]: true,
            [utils.asGridCoord(35,17)]: true,
            [utils.asGridCoord(36,17)]: true,
            [utils.asGridCoord(37,17)]: true,
            [utils.asGridCoord(38,17)]: true,
            [utils.asGridCoord(41,17)]: true,
            [utils.asGridCoord(42,17)]: true,
            [utils.asGridCoord(43,17)]: true,
            [utils.asGridCoord(44,17)]: true,
            [utils.asGridCoord(45,17)]: true,
            [utils.asGridCoord(46,17)]: true,

            //Lab 2 Table
            [utils.asGridCoord(37,3)]: true,
            [utils.asGridCoord(38,3)]: true,
            [utils.asGridCoord(39,3)]: true,
            [utils.asGridCoord(40,3)]: true,
            [utils.asGridCoord(41,3)]: true,
            [utils.asGridCoord(42,3)]: true,

            [utils.asGridCoord(34,6)]: true,
            [utils.asGridCoord(35,6)]: true,
            [utils.asGridCoord(36,6)]: true,
            [utils.asGridCoord(37,6)]: true,
            [utils.asGridCoord(38,6)]: true,
            [utils.asGridCoord(39,6)]: true,
            [utils.asGridCoord(40,6)]: true,
            [utils.asGridCoord(41,6)]: true,
            [utils.asGridCoord(42,6)]: true,
            [utils.asGridCoord(43,6)]: true,
            [utils.asGridCoord(44,6)]: true,
            [utils.asGridCoord(45,6)]: true,

            [utils.asGridCoord(34,9)]: true,
            [utils.asGridCoord(35,9)]: true,
            [utils.asGridCoord(36,9)]: true,
            [utils.asGridCoord(37,9)]: true,
            [utils.asGridCoord(38,9)]: true,
            [utils.asGridCoord(39,9)]: true,
            [utils.asGridCoord(40,9)]: true,
            [utils.asGridCoord(41,9)]: true,
            [utils.asGridCoord(42,9)]: true,
            [utils.asGridCoord(43,9)]: true,
            [utils.asGridCoord(44,9)]: true,
            [utils.asGridCoord(45,9)]: true,

            [utils.asGridCoord(34,12)]: true,
            [utils.asGridCoord(35,12)]: true,
            [utils.asGridCoord(36,12)]: true,
            [utils.asGridCoord(37,12)]: true,
            [utils.asGridCoord(38,12)]: true,
            [utils.asGridCoord(39,12)]: true,
            [utils.asGridCoord(40,12)]: true,
            [utils.asGridCoord(41,12)]: true,
            [utils.asGridCoord(42,12)]: true,
            [utils.asGridCoord(43,12)]: true,
            [utils.asGridCoord(44,12)]: true,
            [utils.asGridCoord(45,12)]: true,

            //Toys Cupboard
            [utils.asGridCoord(33,18)]: true,
            [utils.asGridCoord(34,18)]: true,
            [utils.asGridCoord(35,18)]: true,
            [utils.asGridCoord(36,18)]: true,

            [utils.asGridCoord(43,18)]: true,
            [utils.asGridCoord(44,18)]: true,
            [utils.asGridCoord(45,18)]: true,
            [utils.asGridCoord(46,18)]: true,

            //TV Sofa
            [utils.asGridCoord(34,27)]: true,
            [utils.asGridCoord(35,27)]: true,
            [utils.asGridCoord(36,27)]: true,
            [utils.asGridCoord(37,27)]: true,
            [utils.asGridCoord(33,31)]: true,
            [utils.asGridCoord(34,31)]: true,
            [utils.asGridCoord(35,31)]: true,
            [utils.asGridCoord(36,31)]: true,
            [utils.asGridCoord(37,31)]: true,
            [utils.asGridCoord(37,31)]: true,
            [utils.asGridCoord(38,31)]: true,

            //Counter
            [utils.asGridCoord(45,28)]: true,
            [utils.asGridCoord(45,29)]: true,
            [utils.asGridCoord(45,30)]: true,
            [utils.asGridCoord(45,31)]: true,
            [utils.asGridCoord(46,28)]: true,
            [utils.asGridCoord(46,29)]: true,
            [utils.asGridCoord(46,30)]: true,
            [utils.asGridCoord(46,31)]: true,

            //Lab 1 walls
            [utils.asGridCoord(33,32)]: true,
            [utils.asGridCoord(34,32)]: true,
            [utils.asGridCoord(35,32)]: true,
            [utils.asGridCoord(36,32)]: true,
            [utils.asGridCoord(37,32)]: true,
            [utils.asGridCoord(38,32)]: true,
            [utils.asGridCoord(41,32)]: true,
            [utils.asGridCoord(42,32)]: true,
            [utils.asGridCoord(43,32)]: true,
            [utils.asGridCoord(44,32)]: true,
            [utils.asGridCoord(45,32)]: true,
            [utils.asGridCoord(46,32)]: true,

            [utils.asGridCoord(33,33)]: true,
            [utils.asGridCoord(34,33)]: true,
            [utils.asGridCoord(35,33)]: true,
            [utils.asGridCoord(36,33)]: true,
            [utils.asGridCoord(37,33)]: true,
            [utils.asGridCoord(38,33)]: true,
            [utils.asGridCoord(41,33)]: true,
            [utils.asGridCoord(42,33)]: true,
            [utils.asGridCoord(43,33)]: true,
            [utils.asGridCoord(44,33)]: true,
            [utils.asGridCoord(45,33)]: true,
            [utils.asGridCoord(46,33)]: true,

            [utils.asGridCoord(33,34)]: true,
            [utils.asGridCoord(34,34)]: true,
            [utils.asGridCoord(35,34)]: true,
            [utils.asGridCoord(36,34)]: true,
            [utils.asGridCoord(37,34)]: true,
            [utils.asGridCoord(38,34)]: true,
            [utils.asGridCoord(41,34)]: true,
            [utils.asGridCoord(42,34)]: true,
            [utils.asGridCoord(43,34)]: true,
            [utils.asGridCoord(44,34)]: true,
            [utils.asGridCoord(45,34)]: true,
            [utils.asGridCoord(46,34)]: true,

            [utils.asGridCoord(33,38)]: true,
            [utils.asGridCoord(34,38)]: true,
            [utils.asGridCoord(35,38)]: true,
            [utils.asGridCoord(36,38)]: true,
            [utils.asGridCoord(37,38)]: true,
            [utils.asGridCoord(38,38)]: true,
            [utils.asGridCoord(39,38)]: true,
            [utils.asGridCoord(40,38)]: true,
            [utils.asGridCoord(41,38)]: true,
            [utils.asGridCoord(42,38)]: true,

            [utils.asGridCoord(33,39)]: true,
            [utils.asGridCoord(34,39)]: true,
            [utils.asGridCoord(35,39)]: true,
            [utils.asGridCoord(36,39)]: true,
            [utils.asGridCoord(37,39)]: true,
            [utils.asGridCoord(38,39)]: true,
            [utils.asGridCoord(39,39)]: true,
            [utils.asGridCoord(40,39)]: true,
            [utils.asGridCoord(41,39)]: true,
            [utils.asGridCoord(42,39)]: true,

            [utils.asGridCoord(33,40)]: true,
            [utils.asGridCoord(34,40)]: true,
            [utils.asGridCoord(35,40)]: true,
            [utils.asGridCoord(36,40)]: true,
            [utils.asGridCoord(37,40)]: true,
            [utils.asGridCoord(38,40)]: true,
            [utils.asGridCoord(39,40)]: true,
            [utils.asGridCoord(40,40)]: true,
            [utils.asGridCoord(41,40)]: true,
            [utils.asGridCoord(42,40)]: true,

            [utils.asGridCoord(33,41)]: true,
            [utils.asGridCoord(34,41)]: true,
            [utils.asGridCoord(35,41)]: true,
            [utils.asGridCoord(36,41)]: true,
            [utils.asGridCoord(37,41)]: true,
            [utils.asGridCoord(38,41)]: true,
            [utils.asGridCoord(39,41)]: true,
            [utils.asGridCoord(40,41)]: true,
            [utils.asGridCoord(41,41)]: true,

            [utils.asGridCoord(33,43)]: true,
            [utils.asGridCoord(34,43)]: true,
            [utils.asGridCoord(35,43)]: true,
            [utils.asGridCoord(36,43)]: true,
            [utils.asGridCoord(37,43)]: true,
            [utils.asGridCoord(38,43)]: true,
            [utils.asGridCoord(39,43)]: true,
            [utils.asGridCoord(40,43)]: true,
            [utils.asGridCoord(41,43)]: true,

            [utils.asGridCoord(33,44)]: true,
            [utils.asGridCoord(34,44)]: true,
            [utils.asGridCoord(35,44)]: true,
            [utils.asGridCoord(36,44)]: true,
            [utils.asGridCoord(37,44)]: true,
            [utils.asGridCoord(38,44)]: true,
            [utils.asGridCoord(39,44)]: true,
            [utils.asGridCoord(40,44)]: true,
            [utils.asGridCoord(41,44)]: true,

            //Lab 1 pc
            [utils.asGridCoord(33,35)]: true,
            [utils.asGridCoord(33,36)]: true,
            [utils.asGridCoord(34,35)]: true,
            [utils.asGridCoord(35,35)]: true,
            [utils.asGridCoord(36,35)]: true,
            [utils.asGridCoord(37,35)]: true,
            [utils.asGridCoord(42,35)]: true,
            [utils.asGridCoord(43,35)]: true,
            [utils.asGridCoord(44,35)]: true,
            [utils.asGridCoord(45,35)]: true,
            [utils.asGridCoord(45,36)]: true,
            [utils.asGridCoord(46,35)]: true,

            [utils.asGridCoord(44,42)]: true,
            [utils.asGridCoord(45,42)]: true,
            [utils.asGridCoord(46,42)]: true,
            [utils.asGridCoord(46,43)]: true,

            //Walls
            [utils.asGridCoord(32,27)]: true,
            [utils.asGridCoord(32,28)]: true,
            [utils.asGridCoord(32,29)]: true,
            [utils.asGridCoord(32,30)]: true,
            [utils.asGridCoord(32,31)]: true,
            [utils.asGridCoord(32,32)]: true,
            [utils.asGridCoord(32,33)]: true,
            [utils.asGridCoord(32,34)]: true,
            [utils.asGridCoord(32,35)]: true,
            [utils.asGridCoord(32,36)]: true,
            [utils.asGridCoord(32,37)]: true,
            [utils.asGridCoord(32,38)]: true,
            [utils.asGridCoord(32,39)]: true,
            [utils.asGridCoord(32,40)]: true,
            [utils.asGridCoord(32,41)]: true,
            [utils.asGridCoord(32,42)]: true,
            [utils.asGridCoord(32,43)]: true,
            [utils.asGridCoord(32,44)]: true,
            [utils.asGridCoord(32,45)]: true,
            [utils.asGridCoord(32,46)]: true,
            [utils.asGridCoord(32,47)]: true,

            [utils.asGridCoord(47,26)]: true,
            [utils.asGridCoord(47,27)]: true,
            [utils.asGridCoord(47,28)]: true,
            [utils.asGridCoord(47,29)]: true,
            [utils.asGridCoord(47,30)]: true,
            [utils.asGridCoord(47,31)]: true,
            [utils.asGridCoord(47,32)]: true,
            [utils.asGridCoord(47,33)]: true,
            [utils.asGridCoord(47,34)]: true,
            [utils.asGridCoord(47,35)]: true,
            [utils.asGridCoord(47,36)]: true,
            [utils.asGridCoord(47,37)]: true,
            [utils.asGridCoord(47,38)]: true,
            [utils.asGridCoord(47,39)]: true,
            [utils.asGridCoord(47,40)]: true,
            [utils.asGridCoord(47,41)]: true,
            [utils.asGridCoord(47,42)]: true,
            [utils.asGridCoord(47,43)]: true,
            [utils.asGridCoord(47,44)]: true,
            [utils.asGridCoord(47,45)]: true,
            [utils.asGridCoord(47,46)]: true,
            [utils.asGridCoord(47,47)]: true,

            [utils.asGridCoord(32,47)]: true,
            [utils.asGridCoord(33,47)]: true,
            [utils.asGridCoord(34,47)]: true,
            [utils.asGridCoord(35,47)]: true,
            [utils.asGridCoord(36,47)]: true,
            [utils.asGridCoord(37,47)]: true,
            [utils.asGridCoord(38,47)]: true,
            [utils.asGridCoord(39,47)]: true,
            [utils.asGridCoord(40,47)]: true,
            [utils.asGridCoord(41,47)]: true,
            [utils.asGridCoord(42,47)]: true,
            [utils.asGridCoord(43,47)]: true,
            [utils.asGridCoord(44,47)]: true,
            [utils.asGridCoord(45,47)]: true,
            [utils.asGridCoord(46,47)]: true,
            [utils.asGridCoord(47,47)]: true,
            
            /***************** Lab 3-4 ***********************/   
            [utils.asGridCoord(48,26)]: true,
            [utils.asGridCoord(49,26)]: true,
            [utils.asGridCoord(50,26)]: true,

            [utils.asGridCoord(48,27)]: true,
            [utils.asGridCoord(49,27)]: true,
            [utils.asGridCoord(50,27)]: true,

            [utils.asGridCoord(50,28)]: true,
            [utils.asGridCoord(50,29)]: true,
            [utils.asGridCoord(50,30)]: true,
            [utils.asGridCoord(50,31)]: true,
            [utils.asGridCoord(50,32)]: true,

            [utils.asGridCoord(50,16)]: true,
            [utils.asGridCoord(50,17)]: true,
            [utils.asGridCoord(50,18)]: true,
            [utils.asGridCoord(50,19)]: true,
            [utils.asGridCoord(50,20)]: true,
            [utils.asGridCoord(50,21)]: true,

            [utils.asGridCoord(59,22)]: true,
            [utils.asGridCoord(59,23)]: true,
            [utils.asGridCoord(59,24)]: true,
            [utils.asGridCoord(59,25)]: true,
            [utils.asGridCoord(59,26)]: true,
            [utils.asGridCoord(59,27)]: true,
            [utils.asGridCoord(59,28)]: true,

            [utils.asGridCoord(59,30)]: true,
            [utils.asGridCoord(59,31)]: true,
            [utils.asGridCoord(59,32)]: true,

            [utils.asGridCoord(74,16)]: true,
            [utils.asGridCoord(74,17)]: true,
            [utils.asGridCoord(74,18)]: true,
            [utils.asGridCoord(74,19)]: true,
            [utils.asGridCoord(74,20)]: true,
            [utils.asGridCoord(74,21)]: true,

            [utils.asGridCoord(74,22)]: true,
            [utils.asGridCoord(74,23)]: true,
            [utils.asGridCoord(74,24)]: true,
            [utils.asGridCoord(74,25)]: true,
            [utils.asGridCoord(74,26)]: true,
            [utils.asGridCoord(74,27)]: true,
            [utils.asGridCoord(74,28)]: true,
            [utils.asGridCoord(74,29)]: true,
            [utils.asGridCoord(74,30)]: true,
            [utils.asGridCoord(74,31)]: true,
            [utils.asGridCoord(74,32)]: true,

            //Top wall
            [utils.asGridCoord(50,16)]: true,
            [utils.asGridCoord(51,16)]: true,
            [utils.asGridCoord(52,16)]: true,
            [utils.asGridCoord(53,16)]: true,
            [utils.asGridCoord(54,16)]: true,
            [utils.asGridCoord(55,16)]: true,
            [utils.asGridCoord(56,16)]: true,
            [utils.asGridCoord(57,16)]: true,
            [utils.asGridCoord(58,16)]: true,
            [utils.asGridCoord(59,16)]: true,
            [utils.asGridCoord(60,16)]: true,
            [utils.asGridCoord(61,16)]: true,
            [utils.asGridCoord(62,16)]: true,
            [utils.asGridCoord(63,16)]: true,
            [utils.asGridCoord(64,16)]: true,
            [utils.asGridCoord(65,16)]: true,
            [utils.asGridCoord(66,16)]: true,
            [utils.asGridCoord(67,16)]: true,
            [utils.asGridCoord(68,16)]: true,
            [utils.asGridCoord(69,16)]: true,
            [utils.asGridCoord(70,16)]: true,
            [utils.asGridCoord(71,16)]: true,
            [utils.asGridCoord(72,16)]: true,
            [utils.asGridCoord(73,16)]: true,
            [utils.asGridCoord(74,16)]: true,

            [utils.asGridCoord(50,17)]: true,
            [utils.asGridCoord(51,17)]: true,
            [utils.asGridCoord(52,17)]: true,
            [utils.asGridCoord(53,17)]: true,
            [utils.asGridCoord(54,17)]: true,
            [utils.asGridCoord(55,17)]: true,
            [utils.asGridCoord(56,17)]: true,
            [utils.asGridCoord(57,17)]: true,
            [utils.asGridCoord(58,17)]: true,
            [utils.asGridCoord(59,17)]: true,
            [utils.asGridCoord(60,17)]: true,
            [utils.asGridCoord(61,17)]: true,
            [utils.asGridCoord(62,17)]: true,
            [utils.asGridCoord(63,17)]: true,
            [utils.asGridCoord(64,17)]: true,
            [utils.asGridCoord(65,17)]: true,
            [utils.asGridCoord(66,17)]: true,
            [utils.asGridCoord(67,17)]: true,
            [utils.asGridCoord(68,17)]: true,
            [utils.asGridCoord(69,17)]: true,
            [utils.asGridCoord(70,17)]: true,
            [utils.asGridCoord(71,17)]: true,
            [utils.asGridCoord(72,17)]: true,
            [utils.asGridCoord(73,17)]: true,
            [utils.asGridCoord(74,17)]: true,

            //Mid wall
            [utils.asGridCoord(48,22)]: true,
            [utils.asGridCoord(49,22)]: true,
            [utils.asGridCoord(50,22)]: true,
            [utils.asGridCoord(51,22)]: true,
            [utils.asGridCoord(52,22)]: true,
            [utils.asGridCoord(53,22)]: true,
            [utils.asGridCoord(54,22)]: true,
            [utils.asGridCoord(55,22)]: true,
            [utils.asGridCoord(56,22)]: true,
            [utils.asGridCoord(57,22)]: true,
            [utils.asGridCoord(58,22)]: true,
            [utils.asGridCoord(59,22)]: true,
            [utils.asGridCoord(60,22)]: true,
            [utils.asGridCoord(61,22)]: true,
            [utils.asGridCoord(62,22)]: true,
            [utils.asGridCoord(63,22)]: true,
            [utils.asGridCoord(64,22)]: true,
            [utils.asGridCoord(65,22)]: true,

            [utils.asGridCoord(68,22)]: true,
            [utils.asGridCoord(69,22)]: true,
            [utils.asGridCoord(70,22)]: true,
            [utils.asGridCoord(71,22)]: true,
            [utils.asGridCoord(72,22)]: true,
            [utils.asGridCoord(73,22)]: true,
            [utils.asGridCoord(74,22)]: true,

            [utils.asGridCoord(48,23)]: true,
            [utils.asGridCoord(49,23)]: true,
            [utils.asGridCoord(50,23)]: true,
            [utils.asGridCoord(51,23)]: true,
            [utils.asGridCoord(52,23)]: true,
            [utils.asGridCoord(53,23)]: true,
            [utils.asGridCoord(54,23)]: true,
            [utils.asGridCoord(55,23)]: true,
            [utils.asGridCoord(56,23)]: true,
            [utils.asGridCoord(57,23)]: true,
            [utils.asGridCoord(58,23)]: true,
            [utils.asGridCoord(59,23)]: true,
            [utils.asGridCoord(60,23)]: true,
            [utils.asGridCoord(61,23)]: true,
            [utils.asGridCoord(62,23)]: true,
            [utils.asGridCoord(63,23)]: true,
            [utils.asGridCoord(64,23)]: true,
            [utils.asGridCoord(65,23)]: true,

            [utils.asGridCoord(68,23)]: true,
            [utils.asGridCoord(69,23)]: true,
            [utils.asGridCoord(70,23)]: true,
            [utils.asGridCoord(71,23)]: true,
            [utils.asGridCoord(72,23)]: true,
            [utils.asGridCoord(73,23)]: true,
            [utils.asGridCoord(74,23)]: true,

            //Bottom wall
            [utils.asGridCoord(50,32)]: true,
            [utils.asGridCoord(51,32)]: true,
            [utils.asGridCoord(52,32)]: true,
            [utils.asGridCoord(53,32)]: true,
            [utils.asGridCoord(54,32)]: true,
            [utils.asGridCoord(55,32)]: true,
            [utils.asGridCoord(56,32)]: true,
            [utils.asGridCoord(57,32)]: true,
            [utils.asGridCoord(58,32)]: true,
            [utils.asGridCoord(59,32)]: true,
            [utils.asGridCoord(60,32)]: true,
            [utils.asGridCoord(61,32)]: true,
            [utils.asGridCoord(62,32)]: true,
            [utils.asGridCoord(63,32)]: true,
            [utils.asGridCoord(64,32)]: true,
            [utils.asGridCoord(65,32)]: true,
            [utils.asGridCoord(66,32)]: true,
            [utils.asGridCoord(67,32)]: true,
            [utils.asGridCoord(68,32)]: true,
            [utils.asGridCoord(69,32)]: true,
            [utils.asGridCoord(70,32)]: true,
            [utils.asGridCoord(71,32)]: true,
            [utils.asGridCoord(72,32)]: true,
            [utils.asGridCoord(73,32)]: true,
            [utils.asGridCoord(74,32)]: true,

            //Counter + bookself + boxes + tree
            [utils.asGridCoord(52,24)]: true,
            [utils.asGridCoord(53,24)]: true,
            [utils.asGridCoord(54,24)]: true,
            [utils.asGridCoord(55,24)]: true,
            [utils.asGridCoord(56,24)]: true,
            [utils.asGridCoord(57,24)]: true,
            [utils.asGridCoord(58,24)]: true,

            [utils.asGridCoord(53,25)]: true,
            [utils.asGridCoord(54,25)]: true,
            [utils.asGridCoord(55,25)]: true,
            [utils.asGridCoord(56,25)]: true,

            [utils.asGridCoord(51,31)]: true,
            [utils.asGridCoord(58,31)]: true,

            //Cube
            [utils.asGridCoord(60,31)]: true,
            [utils.asGridCoord(73,30)]: true,

            //Playground
            [utils.asGridCoord(66,29)]: true,
            [utils.asGridCoord(67,29)]: true,
            [utils.asGridCoord(66,30)]: true,
            [utils.asGridCoord(67,30)]: true,

            [utils.asGridCoord(66,27)]: true,
            [utils.asGridCoord(67,27)]: true,

            [utils.asGridCoord(69,27)]: true,
            [utils.asGridCoord(68,29)]: true,

            [utils.asGridCoord(72,27)]: true,

            [utils.asGridCoord(70,28)]: true,
            [utils.asGridCoord(71,28)]: true,
            [utils.asGridCoord(70,29)]: true,
            [utils.asGridCoord(71,29)]: true,

            [utils.asGridCoord(69,30)]: true,

            //Lab 4 PC table
            [utils.asGridCoord(65,18)]: true,
            [utils.asGridCoord(66,18)]: true,
            [utils.asGridCoord(67,18)]: true,
            [utils.asGridCoord(68,18)]: true,
            [utils.asGridCoord(69,18)]: true,
            [utils.asGridCoord(70,18)]: true,
            [utils.asGridCoord(71,18)]: true,
            [utils.asGridCoord(72,18)]: true,
            [utils.asGridCoord(73,18)]: true,

            //Museum things
            [utils.asGridCoord(52,21)]: true,
            [utils.asGridCoord(53,21)]: true,
            [utils.asGridCoord(54,21)]: true,

            [utils.asGridCoord(56,20)]: true,
            [utils.asGridCoord(57,20)]: true,
            [utils.asGridCoord(58,20)]: true,
            [utils.asGridCoord(59,20)]: true,


            [utils.asGridCoord(61,21)]: true,
            [utils.asGridCoord(62,21)]: true,
            [utils.asGridCoord(63,21)]: true,
            



            /***************** Lab 5-6 ***********************/
            //Left wall
            [utils.asGridCoord(11,9)]: true,
            [utils.asGridCoord(11,10)]: true,
            [utils.asGridCoord(11,11)]: true,
            [utils.asGridCoord(11,12)]: true,
            [utils.asGridCoord(11,13)]: true,
            [utils.asGridCoord(11,14)]: true,
            [utils.asGridCoord(11,15)]: true,
            [utils.asGridCoord(11,16)]: true,
            [utils.asGridCoord(11,17)]: true,
            [utils.asGridCoord(11,18)]: true,
            [utils.asGridCoord(11,19)]: true,
            [utils.asGridCoord(11,20)]: true,
            [utils.asGridCoord(11,21)]: true,
            [utils.asGridCoord(11,22)]: true,
            [utils.asGridCoord(11,23)]: true,
            [utils.asGridCoord(11,24)]: true,
            [utils.asGridCoord(11,25)]: true,
            [utils.asGridCoord(11,26)]: true,
            [utils.asGridCoord(11,27)]: true,

            [utils.asGridCoord(12,9)]: true,
            [utils.asGridCoord(13,9)]: true,
            [utils.asGridCoord(14,9)]: true,
            [utils.asGridCoord(15,9)]: true,
            [utils.asGridCoord(16,9)]: true,
            [utils.asGridCoord(17,9)]: true,
            [utils.asGridCoord(18,9)]: true,
            [utils.asGridCoord(19,9)]: true,
            [utils.asGridCoord(20,9)]: true,
            [utils.asGridCoord(21,9)]: true,
            [utils.asGridCoord(22,9)]: true,
            [utils.asGridCoord(23,9)]: true,
            [utils.asGridCoord(24,9)]: true,
            [utils.asGridCoord(25,9)]: true,
            [utils.asGridCoord(26,9)]: true,
            [utils.asGridCoord(27,9)]: true,
            [utils.asGridCoord(28,9)]: true,
            [utils.asGridCoord(29,9)]: true,
            
            [utils.asGridCoord(12,10)]: true,
            [utils.asGridCoord(13,10)]: true,
            [utils.asGridCoord(14,10)]: true,
            [utils.asGridCoord(15,10)]: true,
            [utils.asGridCoord(16,10)]: true,
            [utils.asGridCoord(17,10)]: true,
            [utils.asGridCoord(18,10)]: true,
            [utils.asGridCoord(19,10)]: true,
            [utils.asGridCoord(20,10)]: true,
            [utils.asGridCoord(21,10)]: true,
            [utils.asGridCoord(22,10)]: true,
            [utils.asGridCoord(23,10)]: true,
            [utils.asGridCoord(24,10)]: true,
            [utils.asGridCoord(25,10)]: true,
            [utils.asGridCoord(26,10)]: true,
            [utils.asGridCoord(27,10)]: true,
            [utils.asGridCoord(28,10)]: true,
            [utils.asGridCoord(29,10)]: true,

            //PC(Lab 5)
            [utils.asGridCoord(21,11)]: true,
            [utils.asGridCoord(22,11)]: true,

            //PC(Lab 6)
            [utils.asGridCoord(13,13)]: true,
            [utils.asGridCoord(14,13)]: true,
            [utils.asGridCoord(15,13)]: true,
            [utils.asGridCoord(16,13)]: true,
            [utils.asGridCoord(17,13)]: true,
            [utils.asGridCoord(18,13)]: true,

            //Table
            [utils.asGridCoord(25,13)]: true,
            [utils.asGridCoord(26,13)]: true,
            [utils.asGridCoord(24,14)]: true,
            [utils.asGridCoord(25,14)]: true,
            [utils.asGridCoord(26,14)]: true,
            [utils.asGridCoord(27,14)]: true,

            //Basketball Piano
            [utils.asGridCoord(12,15)]: true,
            [utils.asGridCoord(13,15)]: true,
            [utils.asGridCoord(14,15)]: true,
            [utils.asGridCoord(15,15)]: true,
            [utils.asGridCoord(16,15)]: true,

            [utils.asGridCoord(12,16)]: true,
            [utils.asGridCoord(13,16)]: true,
            [utils.asGridCoord(14,16)]: true,
            [utils.asGridCoord(15,16)]: true,
            [utils.asGridCoord(16,16)]: true,

            [utils.asGridCoord(12,17)]: true,
            [utils.asGridCoord(13,17)]: true,
            [utils.asGridCoord(14,17)]: true,
            [utils.asGridCoord(15,17)]: true,
            [utils.asGridCoord(16,17)]: true,
            

            //TV Table Chair
            [utils.asGridCoord(12,21)]: true,
            [utils.asGridCoord(12,22)]: true,
            [utils.asGridCoord(16,20)]: true,
            [utils.asGridCoord(14,21)]: true,
            [utils.asGridCoord(15,21)]: true,
            [utils.asGridCoord(16,21)]: true,
            [utils.asGridCoord(16,22)]: true,
            [utils.asGridCoord(16,23)]: true,

            //TV Table Sofa
            [utils.asGridCoord(23,16)]: true,
            [utils.asGridCoord(24,16)]: true,
            [utils.asGridCoord(25,16)]: true,
            [utils.asGridCoord(26,16)]: true,
            [utils.asGridCoord(27,16)]: true,
            [utils.asGridCoord(28,16)]: true,
            [utils.asGridCoord(28,17)]: true,
            [utils.asGridCoord(23,20)]: true,
            [utils.asGridCoord(24,20)]: true,
            [utils.asGridCoord(25,20)]: true,
            [utils.asGridCoord(26,20)]: true,
            [utils.asGridCoord(27,20)]: true,
            [utils.asGridCoord(28,20)]: true,

            //Gift Bag
            [utils.asGridCoord(12,26)]: true,
            [utils.asGridCoord(13,26)]: true,

            //Statue x 2
            // [utils.asGridCoord(20,23)]: true,
            // [utils.asGridCoord(22,23)]: true,

            //Counter
            [utils.asGridCoord(24,23)]: true,
            [utils.asGridCoord(25,23)]: true,
            [utils.asGridCoord(26,23)]: true,
            [utils.asGridCoord(27,23)]: true,
            [utils.asGridCoord(28,23)]: true,
            [utils.asGridCoord(24,24)]: true,
            [utils.asGridCoord(25,24)]: true,
            [utils.asGridCoord(26,24)]: true,
            [utils.asGridCoord(27,24)]: true,
            
            [utils.asGridCoord(20,10)]: true,
            [utils.asGridCoord(20,11)]: true,
            [utils.asGridCoord(20,12)]: true,
            [utils.asGridCoord(20,13)]: true,
            [utils.asGridCoord(20,14)]: true,
            [utils.asGridCoord(20,15)]: true,
            [utils.asGridCoord(20,16)]: true,
            [utils.asGridCoord(20,19)]: true,
            [utils.asGridCoord(20,20)]: true,

            [utils.asGridCoord(29,10)]: true,
            [utils.asGridCoord(29,11)]: true,
            [utils.asGridCoord(29,12)]: true,
            [utils.asGridCoord(29,13)]: true,
            [utils.asGridCoord(29,14)]: true,
            [utils.asGridCoord(29,15)]: true,
            [utils.asGridCoord(29,16)]: true,
            [utils.asGridCoord(29,17)]: true,
            [utils.asGridCoord(29,18)]: true,
            [utils.asGridCoord(29,19)]: true,
            [utils.asGridCoord(29,20)]: true,

            [utils.asGridCoord(20,21)]: true,
            [utils.asGridCoord(21,21)]: true,
            [utils.asGridCoord(22,21)]: true,
            [utils.asGridCoord(23,21)]: true,
            [utils.asGridCoord(24,21)]: true,
            [utils.asGridCoord(25,21)]: true,
            [utils.asGridCoord(26,21)]: true,
            [utils.asGridCoord(27,21)]: true,
            [utils.asGridCoord(28,21)]: true,
            [utils.asGridCoord(29,21)]: true,
            [utils.asGridCoord(30,21)]: true,
            [utils.asGridCoord(31,21)]: true,
            [utils.asGridCoord(32,21)]: true,

            [utils.asGridCoord(20,22)]: true,
            [utils.asGridCoord(21,22)]: true,
            [utils.asGridCoord(22,22)]: true,
            [utils.asGridCoord(23,22)]: true,
            [utils.asGridCoord(24,22)]: true,
            [utils.asGridCoord(25,22)]: true,
            [utils.asGridCoord(26,22)]: true,
            [utils.asGridCoord(27,22)]: true,
            [utils.asGridCoord(28,22)]: true,
            [utils.asGridCoord(29,22)]: true,
            [utils.asGridCoord(30,22)]: true,
            [utils.asGridCoord(31,22)]: true,
            [utils.asGridCoord(32,22)]: true,

            [utils.asGridCoord(12,27)]: true,
            [utils.asGridCoord(13,27)]: true,
            [utils.asGridCoord(14,27)]: true,
            [utils.asGridCoord(15,27)]: true,
            [utils.asGridCoord(16,27)]: true,
            [utils.asGridCoord(17,27)]: true,
            [utils.asGridCoord(18,27)]: true,
            [utils.asGridCoord(19,27)]: true,
            [utils.asGridCoord(20,27)]: true,
            [utils.asGridCoord(21,27)]: true,
            [utils.asGridCoord(22,27)]: true,
            [utils.asGridCoord(23,27)]: true,
            [utils.asGridCoord(24,27)]: true,
            [utils.asGridCoord(25,27)]: true,
            [utils.asGridCoord(26,27)]: true,
            [utils.asGridCoord(27,27)]: true,
            [utils.asGridCoord(28,27)]: true,
            [utils.asGridCoord(29,27)]: true,
            [utils.asGridCoord(30,27)]: true,
            [utils.asGridCoord(31,27)]: true,
            [utils.asGridCoord(32,27)]: true,

         
        },
    },
}