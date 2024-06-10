namespace WebAPI.Utils.Mail
{
    public class MailRequest
    {
        //email do destinatatio
        public string? ToEmail { get; set; }

        //assunto do email
        public string? Subject { get; set; }

        //corpo do email
        public string? Body { get; set; }
    }
}