import type from './types'

export default {
    setFormData(firstName, level, speed, countSteps) {
        return {
            type: type.SET_FORM_DATA,
            firstName,
            level,
            speed,
            countSteps,
            formSubmit: true,
        }
    }
}
