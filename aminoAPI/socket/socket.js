const WebSocket = require('ws');
const eventEmitter = require('events');
const dotenv = require('dotenv');
const path = require('path');

const __rootdir = path.resolve(__dirname, '../../../');
dotenv.config({ path: `${__rootdir}/.env` })

const userAgent = process.env.USERAGENT;
const deviceID = process.env.DEVICE;
const sig = process.env.SIG;

class aminoSocket extends eventEmitter {
    constructor(sid, uuid) {
        super();
        this.sid = sid;
        this.uuid = uuid;
        this.wsc;
        this.wscTwo;
        this.pingerOne;
        this.pingerTwo;
        this.queue = [];

    }
    startOne() {
        try {
            this.wsc = new WebSocket(`wss://ws4.narvii.com/`, {
                headers: {
                    'Accept-Encoding': 'gzip',
                    "Accept-Language": "en-US",
                    "Connection": "Keep-Alive",
                    "Content-Type": "application/json; charset=utf-8",
                    'Upgrade': 'websocket',
                    'Host': 'ws4.narvii.com',
                    'user-agent': userAgent,
                    'NDCDEVICEID': deviceID,
                    'NDCAUTH': `sid=${this.sid}`,
                    'AUID': this.uuid,
                    "NDC-MSG-SIG": sig
                }
            });

            this.pingerOne = setInterval(() => {
                this.wsc.ping('ping');
            }, 15000);

            this.wsc.on("open", () => {
                console.log("Amino SocketOne started :^)");
            })

            this.wsc.on("close", () => {
                console.log("socketOne cerrado correctamente");

            })

            this.wsc.on("message", (msg) => {
                const message = JSON.parse(msg);
                if (message.t === 1000) {
                    this.emit('rawMsg', message.o.chatMessage);
                }
            });

            return this.wsc;

        } catch (error) {
            console.log('Error al intentar abrir ws', error);
            this.startOne();
        }

    }

    closeOne() {
        clearInterval(this.pingerOne);
        this.wsc.close();
    }

    startTwo() {

        try {
            this.wscTwo = new WebSocket(`wss://ws4.narvii.com/`, {

                //headers: headers
                headers: {
                    'Accept-Encoding': 'gzip',
                    "Accept-Language": "en-US",
                    "Connection": "Keep-Alive",
                    "Content-Type": "application/json; charset=utf-8",
                    'Upgrade': 'websocket',
                    'Host': 'ws4.narvii.com',
                    'user-agent': userAgent,
                    'NDCDEVICEID': deviceID,
                    'NDCAUTH': `sid=${this.sid}`,
                    'AUID': this.uuid,
                    "NDC-MSG-SIG": sig
                }
            });

            this.pingerTwo = setInterval(() => {
                this.wscTwo.ping('ping');
            }, 15000);

            this.wscTwo.on("open", () => {
                console.log("Amino SocketTwo started :^)");
            })

            this.wscTwo.on("close", () => {
                console.log("socketTwo cerrado correctamente");
            })

            this.wscTwo.on("message", (msg) => {

                const message = JSON.parse(msg);

                if (message.t === 1000) {
                    this.emit('rawMsg', message.o.chatMessage);
                }
            });

            return this.wscTwo;
        } catch (error) {
            console.log('Error al intentar abrir ws en wsTwo', error);
            this.startTwo();
        }

    }


    closeTwo() {
        clearInterval(this.pingerTwo);
        this.wscTwo.close();
    }

    startListen() {
        let that = this;

        this.on('rawMsg', (rawMessage) => {
            if (that.queue.includes(rawMessage.messageId)) {
                return;
            }

            that.queue.push(rawMessage.messageId);
            that.emit('message', rawMessage);

            if (that.queue.length > 50) {
                that.queue.shift();
            }
        });

        this.startOne();
        let switcher = true;

        setTimeout(function resetSocket() {
            if (switcher) {
                that.startTwo();
                setTimeout(() => {
                    that.closeOne();
                    switcher = false;
                }, 4000);
            } else {
                that.startOne();
                setTimeout(() => {
                    that.closeTwo();
                    switcher = true;
                }, 4000)
            }

            setTimeout(resetSocket, 480000);
        }, 480000);

    }
}

module.exports = aminoSocket;