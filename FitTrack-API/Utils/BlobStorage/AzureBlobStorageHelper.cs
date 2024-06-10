using API_FitTrack.Domains;
using Azure.Storage.Blobs;
using FitTrack_API.Domains;

namespace WebAPI.Utils.BlobStorage
{
    public static class AzureBlobStorageHelper
    {
        private static readonly string StringConnection = "DefaultEndpointsProtocol=https;AccountName=blobvitalhubg16enzo;AccountKey=oE4zwTcqqxKfuErbVv7o9ETdAbHzELSZDt7o60W5hQ07zfFdTU4YuZIGtOyVKRjh3E3GzJwRnAHn+AStsOUjgA==;EndpointSuffix=core.windows.net";

        private static readonly string ContainerName = "containerfittrack";
        public static async Task<UsuarioMidia> UploadImageBlobAsync(IFormFile file)
        {
            try
            {
                UsuarioMidia usuarioMidiaUpado = new();
                //verifica se existe um arquivo
                if (file != null)
                {
                    //gera um nome unico + extensao do arquivo
                    var blobName = Guid.NewGuid().ToString().Replace("-", "") + Path.GetExtension(file.FileName);

                    //cria uma instancia do client blob service e passa a string de conexao 
                    var blobServiceClient = new BlobServiceClient(StringConnection);

                    //obtem um container client usando o nome do container do blob
                    var blobContainerClient = blobServiceClient.GetBlobContainerClient(ContainerName);

                    //obtem um blob client usando o blob name
                    var blobClient = blobContainerClient.GetBlobClient(blobName);

                    //abre o fluxo de entrada do arquivo(foto)
                    using (var stream = file.OpenReadStream())
                    {
                        //carrega o arquivo para o blob storage de forma assincrona 
                        await blobClient.UploadAsync(stream, true);
                    }
                    //retorna a uri do blob como uma string 
                    usuarioMidiaUpado.FotoUsuario = blobClient.Uri.ToString();

                    usuarioMidiaUpado.BlobNameFotoUsuario = blobName;
                    return usuarioMidiaUpado;
                }
                else
                {
                    //retorna a uri de uma imagem padrao caso nenhum arquivo seja enviado
                    //usuarioUpado.Foto = "https://blobvitalhubg16enzo.blob.core.windows.net/containerfittrack/profileimage.jpg";
                    usuarioMidiaUpado!.FotoUsuario = "https://blobvitalhubg16enzo.blob.core.windows.net/containerfittrack/default_image.png";

                    return usuarioMidiaUpado;
                }
            }
            catch (Exception)
            {

                throw;
            }
        }

        public static async Task DeleteBlobAsync(string blobName)
        {
            try
            {
                // Cria uma instância do cliente BlobService usando a string de conexão
                var blobServiceClient = new BlobServiceClient(StringConnection);

                // Obtém um BlobContainerClient para o container onde o blob está localizado
                var blobContainerClient = blobServiceClient.GetBlobContainerClient(ContainerName);

                // Obtém um BlobClient para o blob que deseja deletar
                var blobClient = blobContainerClient.GetBlobClient(blobName);

                // Deleta o blob de forma assíncrona
                await blobClient.DeleteIfExistsAsync();
            }
            catch (Exception e)
            {

                throw;
            }
        }
    }
}