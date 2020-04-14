import { uuid } from 'uuidv4';

class Appointment {
    constructor({ provider, date }: Omit<Appointment, 'id'>) {
        this.id = uuid();
        this.provider = provider;
        this.date = date;
    }

    id: string;

    provider: string;

    date: Date;
}

export default Appointment;