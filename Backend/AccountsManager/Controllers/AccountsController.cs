using AccountsManager.Middleware;
using BusinessLogic.Repositories;
using Domain;

using FluentValidation.Results;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Persistence;

namespace AccountsManager.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountsController : ControllerBase
    {
        
        private readonly IAccountRepository repository;
        

        public AccountsController(IAccountRepository repository)
        {
            
            this.repository = repository;
            
        }


        [HttpGet]
        [ProducesResponseType(200, Type=typeof(IEnumerable<Account>))]
        [ProducesResponseType(400)]
        public async Task<IActionResult> GetAccounts()
        {
            try
            {
                var getAllRecords= await repository.RetrieveAllAsync();
                return Ok(getAllRecords);
            }catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("{id}", Name =nameof(GetAccountByID))]
        [ProducesResponseType(200, Type=typeof(Account))]
        [ProducesResponseType(404)]
        public async Task<IActionResult> GetAccountByID(int id)
        {
            try
            {
                Account? account = await repository.RetrieveAsyncById(id);
                return Ok(account); 
            }catch(Exception ex)
            {
                return NotFound();
            }
           
        }
        [HttpPost]
        [ProducesResponseType(201,Type=typeof(Account) )]
        [ProducesResponseType(400)]
        public async Task<IActionResult> CreateAccount([FromBody] Account account)
        {
            try
            {
                
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState); 
                }

                Account? addedAccount = await repository.CreateAsync(account);
                var creatingAccount = CreatedAtRoute(routeName: nameof(GetAccountByID),
                    routeValues: new { id = addedAccount!.Id },
                    value: addedAccount);
                return creatingAccount; 

            }
            catch(Exception ex)
            {
               return BadRequest(ex.Message); 

            }
        }

        [HttpPut("{id}")]
        [ProducesResponseType(204)]
        [ProducesResponseType(400)]
        [ProducesResponseType(404)]
        public async Task<ActionResult<Account>> UpdateAccount(int id, [FromBody] Account account)
        {
            try
            {

                Account? currentAccount = await repository.RetrieveAsyncById(id);
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                if (currentAccount ==null)
                {
                    return NotFound();
                }

                currentAccount.Id = id;
                await repository.UpdateAsync(account); 
                
    
               
                return  NoContent();
            }catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
         
        }

        [HttpPut("deposit/{id}")]
        [ProducesResponseType(204)]
        [ProducesResponseType(400)]
        [ProducesResponseType(404)]
        public async Task<IActionResult> DepositMoney(int id, decimal balance)
        {
            try
            {
               
                Account? currentAccount = await repository.RetrieveAsyncById(id);

                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }
                if (currentAccount == null)
                {
                    return NotFound();
                }

                await repository.DepositMoney(id, balance);
                return NoContent();

            }catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
           

        }


        [HttpPut("withdraw/{id}")]
        [ProducesResponseType(204)]
        [ProducesResponseType(400)]
        [ProducesResponseType(404)]
        public async Task<IActionResult> WithdrawMoney(int id, decimal balance)
        {
            try
            {

     
                Account? currentAccount = await repository.RetrieveAsyncById(id);
                if (currentAccount == null)
                {
                    return NotFound();
                }
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                await repository.WithdrawMoney(id, balance);
                
                return NoContent();

            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }

        [HttpDelete("{id}")]
        [ProducesResponseType(204)]
        [ProducesResponseType(400)]
        [ProducesResponseType(404)]
        public async Task<IActionResult> DeleteAccount(int id)
        {
            try
            {
                Account? existingAccount = await repository.RetrieveAsyncById(id);

                if (existingAccount == null) return NotFound();

                await repository.DeleteAsync(id);

                return NoContent();

            }catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
            
        }
        
    }

}
