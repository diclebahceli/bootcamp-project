namespace socialMedia.Persistence;

public class WriteRepository<T> : IWriteRepository<T> where T : class, IEntityBase, new()
{

}
