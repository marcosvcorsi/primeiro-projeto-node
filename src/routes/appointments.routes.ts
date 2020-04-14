import { Router } from 'express';
import { parseISO } from 'date-fns';

import AppointmentsRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';

const appointmentsRouter = Router();
const appointmentsRepository = new AppointmentsRepository();


// SoC: Separation of concerns (Separação de preocupações)
// DTO - Data Transfer Object

// Rota: receber requisição, chamar outro arquivo e devolver reposta;

appointmentsRouter.get('/', (request, response) => {
    const appointments = appointmentsRepository.findAll();

    return response.json(appointments);
})

appointmentsRouter.post('/', (request, response) => {
    try {
        const { provider, date } = request.body;

        const parsedDate = parseISO(date);

        const createAppoitment = new CreateAppointmentService(
            appointmentsRepository
        )

        const appointment = createAppoitment.execute({ date: parsedDate, provider });

        return response.json(appointment);
    } catch (err) {
        return response.status(400).json({ error: err.message });
    }
})

export default appointmentsRouter;