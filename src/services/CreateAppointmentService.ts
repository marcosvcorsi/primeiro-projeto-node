import { startOfHour } from 'date-fns';

import Appointment from '../models/Appointment';
import AppointmentsRepository from '../repositories/AppointmentsRepository';

/**
 * [X] Recebimento das Informações
 * 
 * [X] Tratativa de erro e exceções
 * 
 * [] Repositorio
 */

interface Request {
    provider: string;
    date: Date;
}

/**
 * Dependency Inversion
 */

// DRY: Dont repeat yourself

// SOLID

// Single responsability principle 
// Dependency inversion principle

class CreateAppointmentService {
    private appointmentsRepository: AppointmentsRepository;

    constructor(appointmentsRepository: AppointmentsRepository) {
        this.appointmentsRepository = appointmentsRepository;
    }

    public execute({ provider, date }: Request): Appointment {
        const appointmentDate = startOfHour(date);

        const findAppointmentInSameDate = this.appointmentsRepository.findByDate(appointmentDate);

        if (findAppointmentInSameDate) {
            throw Error('This appointment is already booked');
        }

        const appointment = this.appointmentsRepository.create({ provider, date: appointmentDate });

        return appointment;
    }
}

export default CreateAppointmentService;