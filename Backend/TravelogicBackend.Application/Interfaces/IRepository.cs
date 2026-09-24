namespace Travelogic.Application.Interfaces;

public interface IRepository<T> where T : class
{
    Task<T?> GetByIdAsync(int id, CancellationToken cancellationToken= default);
    Task<IEnumerable<T>> GetAllAsync(CancellationToken cancellationToken= default);
    Task AddAsync(T entity);
    Task UpdateAsync(T entity);
    Task DeleteAsync(int id, CancellationToken cancellationToken= default); 
}