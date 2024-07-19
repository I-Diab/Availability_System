const moment = require('moment-timezone');

class LLM {
    
    constructor() {
        if (new.target === LLM) {
            throw new TypeError("Cannot construct LLM instances directly");
        }
    }

    createPrompt(availability) {
        return `Extract all time slots from the following statement and list them as elements in JSON format {start: 'start time', end: 'end time'}.
        Make sure that the extracted time slots are after the current timestamp.

        Examples:
        ------------------------------------------
        
        The current timestamp is "Mon, 22 Jul 2024 08:00:00 GMT".
        Input: "I am available from 9:00 AM to 12:00 PM and then from 2:00 PM to 5:00 PM on Monday."
        Output: [{"start": "2024-07-22T09:00:00", "end": "2024-07-22T12:00:00"}, {"start": "2024-07-22T14:00:00", "end": "2024-07-22T17:00:00"}]

        The current timestamp is "Tue, 23 Jul 2024 05:00:00 GMT".
        Input: "My schedule is free from 10:00 AM to 11:30 AM, 1:00 PM to 3:00 PM, and 4:30 PM to 6:00 PM on Tuesday and Thursday."
        Output: [{"start": "2024-07-23T10:00:00", "end": "2024-07-23T11:30:00"}, {"start": "2024-07-23T13:00:00", "end": "2024-07-23T15:00:00"}, {"start": "2024-07-23T16:30:00", "end": "2024-07-23T18:00:00"}, {"start": "2024-07-25T10:00:00", "end": "2024-07-25T11:30:00"}, {"start": "2024-07-25T13:00:00", "end": "2024-07-25T15:00:00"}, {"start": "2024-07-25T16:30:00", "end": "2024-07-25T18:00:00"}]

        The current timestamp is "Wed, 24 Jul 2024 01:00:00 GMT".
        Input: "I can meet from 8:00 AM to 9:30 AM, 11:00 AM to 12:30 PM, and 2:30 PM to 4:00 PM on Wednesday and Friday."
        Output: [{"start": "2024-07-24T08:00:00", "end": "2024-07-24T09:30:00"}, {"start": "2024-07-24T11:00:00", "end": "2024-07-24T12:30:00"}, {"start": "2024-07-24T14:30:00", "end": "2024-07-24T16:00:00"}, {"start": "2024-07-26T08:00:00", "end": "2024-07-26T09:30:00"}, {"start": "2024-07-26T11:00:00", "end": "2024-07-26T12:30:00"}, {"start": "2024-07-26T14:30:00", "end": "2024-07-26T16:00:00"}]
        
        The current time stamp is "${moment().tz(moment.tz.guess()).format('LLLL')}".
        Input: "${availability}"
        Output: `;
    }

    async extract(availability) {
        throw new Error("Method 'extract()' must be implemented.");
    }
}

module.exports = LLM;