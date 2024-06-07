using Azure.Storage.Blobs;

namespace WebAPI.Utils.BlobStorage
{
    public static class AzureBlobStorageHelper
    {
        public static async Task<string> UploadImageBlobAsync(IFormFile file, string stringConnection, string containerName)
        {
            try
            {
                //verifica se existe um arquivo
                if (file != null)
                {
                    //gera um nome unico + extensao do arquivo
                    var blobName = Guid.NewGuid().ToString().Replace("-", "") + Path.GetExtension(file.FileName);

                    //cria uma instancia do client blob service e passa a string de conexao 
                    var blobServiceClient = new BlobServiceClient(stringConnection);

                    //obtem um container client usando o nome do container do blob
                    var blobContainerClient = blobServiceClient.GetBlobContainerClient(containerName);

                    //obtem um blob client usando o blob name
                    var blobClient = blobContainerClient.GetBlobClient(blobName);

                    //abre o fluxo de entrada do arquivo(foto)
                    using (var stream = file.OpenReadStream())
                    {
                        //carrega o arquivo para o blob storage de forma assincrona 
                        await blobClient.UploadAsync(stream, true);
                    }
                    //retorna a uri do blob como uma string 
                    return blobClient.Uri.ToString();
                }
                else
                {
                    //retorna a uri de uma imagem padrao caso nenhum arquivo seja enviado
                    return "https://blobvitalhubg16enzo.blob.core.windows.net/containerfittrack/profileimage.jpg";
                }
            }
            catch (Exception)
            {

                throw;
            }
        }
    }
}