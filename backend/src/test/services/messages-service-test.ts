import { MessageEntity, messagesRepository, MessagesRepository } from "../../repositories/messages-repository";
import { MessagesService } from "../../services/messages-service";

const sinon = require("sinon");
const expect = require("chai").expect;

describe("MessagesService test", function() {

    afterEach(function () {
        sinon.restore();
    });

    it("getAllMessages", async function () {
        sinon.stub(MessagesRepository.prototype, "getAllMessages").returns(messages())
        const messagesService = new MessagesService();

        const result = await messagesService.getAllMessages();

        expect(result).to.equal(messagesStub);
    });

    it("getAllUnsentMessages", async function () {
        sinon.stub(MessagesRepository.prototype, "getAllMessages").returns(unsentMessages())
        const messagesService = new MessagesService();

        const result = await messagesService.getAllMessages();

        expect(result[0]).to.equal(messagesStub[0]);
    });

    it("insertMessage", function () {
        sinon.stub(MessagesRepository.prototype, "insertMessage")
        const messagesService = new MessagesService();

        expect(() => messagesService.insertMessage(messagesStub[0])).to.not.throw();
    });

});

function messages(): Promise<MessageEntity[]> {
    return new Promise(resolve => {
        resolve(messagesStub);
    })
}

function unsentMessages(): Promise<MessageEntity[]> {
    return new Promise(resolve => {
        resolve(messagesStub.filter(m => !m.isSent));
    })
}

const messagesStub = [
    {
        type: "email1",
        isSent: false,
        sender: "sender",
        receiver: "receiver",
        subject: "test",
        body: "body test"
    },
    {
        type: "email2",
        isSent: true,
        sender: "sender",
        receiver: "receiver",
        subject: "test",
        body: "body test"
    }
]