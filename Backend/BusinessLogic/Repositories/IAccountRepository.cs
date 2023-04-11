using Domain;

namespace BusinessLogic.Repositories
{
    public interface IAccountRepository
    {

        Task <IEnumerable<Account>> RetrieveAllAsync();
        Task<Account?> RetrieveAsyncById(int id);
        Task<Account?> CreateAsync(Account account);
        Task<Account> UpdateAsync( Account account);
        Task<Account?> DeleteAsync(int id);
        Task<Account> DepositMoney(int id, decimal balance);
        Task<Account> WithdrawMoney(int id, decimal balance);
        
    }
}