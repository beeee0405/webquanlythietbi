using System;
using Npgsql;

class Program
{
    static void Main()
    {
        var dbUrl = "postgresql://postgres.ktxkxtksixzjmmqtrsqi:webquanlithietbi@aws-1-ap-northeast-2.pooler.supabase.com:5432/postgres";
        var uri = new Uri(dbUrl);
        var userInfo = uri.UserInfo.Split(':', 2);
        
        var builder = new NpgsqlConnectionStringBuilder
        {
            Host = uri.Host,
            Port = uri.Port > 0 ? uri.Port : 5432,
            Username = userInfo[0],
            Password = userInfo.Length > 1 ? userInfo[1] : "",
            Database = uri.AbsolutePath.TrimStart('/'),
            SslMode = SslMode.Require,
            TrustServerCertificate = true,
            Timeout = 10,
            CommandTimeout = 10
        };

        Console.WriteLine($"ConnString: {builder.ConnectionString}");

        try
        {
            using var conn = new NpgsqlConnection(builder.ConnectionString);
            conn.Open();
            Console.WriteLine("Connected successfully!");
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error: {ex.Message}");
            if (ex.InnerException != null) Console.WriteLine($"Inner: {ex.InnerException.Message}");
        }
    }
}
