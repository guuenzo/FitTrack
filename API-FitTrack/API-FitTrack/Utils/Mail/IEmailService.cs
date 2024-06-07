namespace WebAPI.Utils.Mail
{
    public interface IEmailService
    {
        //metodo assincrono para envio de email
        Task SendEmailAsync(MailRequest mailRequest);
    }
}