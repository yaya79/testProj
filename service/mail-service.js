const nodemailer = require('nodemailer');

class MailService {

    constructor() {
        this.transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            secure: true,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD
            }
        })
    }

    async sendActivationMail(link, firstName, lastName, phone, email, municipality) {
        await this.transporter.sendMail({
            from: process.env.SMTP_USER,
            to: "registryfairmoscowreg@mail.ru",
            subject: 'Активация аккаунта в системе Реестр Ярмарок Московской области ',
            text: '',
            html:
                `
                <div>
                Имя: ${firstName}<br>
                Фамилия: ${lastName}<br>
                Муниципалитет (г.о.): ${municipality}<br>
                Телефон: ${phone}<br>
                email: ${email}<br>
                </div>
                <hr>
                    <div>
                        <h3>Для активации перейдите по ссылке</h3>
                        <a href="${link}">${link}</a>
                    </div>
                `
        })
    }
}

module.exports = new MailService();
