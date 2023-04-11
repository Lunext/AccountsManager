using Domain;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System.Net;
using System.Security.AccessControl;

namespace BusinessLogic.Repositories
{
    public class AccountRepository : IAccountRepository
    {
        private readonly ApplicationDbContext context;

        public AccountRepository(ApplicationDbContext context)
        {
            this.context = context;
        }


        public async Task<Account?> CreateAsync(Account account)
        {
            try
            {
                 await context.Accounts.AddAsync(account);
                 await context.SaveChangesAsync();
                return account; 
            }catch(Exception ex)
            {
                throw new Exception("No se pudo crear la cuenta.", ex);

            }
        }

        public  async Task<Account?> DeleteAsync(int id)
        {
            try
            {
                Account? account = context.Accounts.Find(id);
                context.Accounts.Remove(account!);
                await context.SaveChangesAsync();
                return account;
            }catch(Exception ex)
            {
                throw new Exception("No pudimos borrar su cuenta", ex); 
            }
               
        }

        public async Task<Account> DepositMoney(int id, decimal balance)
        {
            try
            {
                var account = context.Accounts.Find(id);
                account!.Balance += balance;
                await context.SaveChangesAsync();
                return account;
            }
            catch (Exception ex)
            {
                throw new Exception("No se pudo realizar el deposito...",ex);
            }
            

        }

        public async Task<IEnumerable<Account>> RetrieveAllAsync()
        {
            try
            {
                var accountsRecords = await context.Accounts.ToListAsync();
                return accountsRecords;
            }
            catch (Exception ex)
            {
                throw new Exception("No se pudieron obtener los registros", ex);
            }
        }

        public async Task<Account?> RetrieveAsyncById(int id)
        {
            try
            {
                var account = await context.Accounts.FindAsync(id);

                return account; 
                
            }catch(Exception ex)
            {
                throw new Exception("No se puedo encontrar la cuenta", ex);
            }
        }

        public async Task<Account> UpdateAsync(Account account)
        {
            try
            { 
                var existingAccount = context.Accounts.Find(account.Id);
                if (existingAccount == null)
                {
                    throw new Exception($"No se pudo encontrar la cuenta");
                }

                context.Entry(existingAccount).CurrentValues.SetValues(account);

                context.Accounts.Update(existingAccount);

                await context.SaveChangesAsync();
               
                return account;
            }
            catch (Exception ex)
            {
                throw new Exception("No se puedo actualizar la cuenta.", ex);
            }
        }

        public async Task<Account> WithdrawMoney(int id, decimal balance)
        {
            try
            {
              
                var account = context.Accounts.Find(id);
                account!.Balance -= balance;
                await context.SaveChangesAsync();

                return account;

            }catch(Exception ex)
            {
                throw new Exception("No pudimos retirarle su dinero...", ex);

            }
        }
    }
}
