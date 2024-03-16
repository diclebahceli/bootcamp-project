using socialMedia.Domain;

namespace socialMedia.Application;

public interface IWriteRepository<T> where T : class, IEntityBase, new()
{

}
