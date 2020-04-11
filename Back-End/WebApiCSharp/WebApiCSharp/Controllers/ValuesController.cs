using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Net.Http;
using Microsoft.AspNetCore.Mvc;
using MySql.Data.MySqlClient;
using System.Collections;
using System.Web.Http.Cors;
using Newtonsoft.Json;

namespace WebApiCSharp.Controllers
{
    public class Person
    {
        public int id;
        public string name;
        public string cui;
        public double balance;
        public string image;

        public Person()
        {
            this.id = 0;
            this.name = "";
            this.cui = "";
            this.balance = 0;
            this.image = "";
        }
    }

    [EnableCors(origins: "*", headers: "*", methods: "*")]
    [Route("api/[controller]")]
    [ApiController]
    public class ValuesController : ControllerBase
    {
        public static MySqlConnection conn()
        {
            string host = "localhost", port = "3306", database = "entrevista", username = "root", password = "root";
            string conn_string = "server=" + host
                                + ";port=" + port
                                + ";database=" + database
                                + ";username=" + username
                                + ";password=" + password;
            MySqlConnection conn = new MySqlConnection(conn_string);
            return conn;
        }

        // GET api/values
        [HttpGet]
        public IActionResult Get()
        {
            MySqlConnection connection = conn();
            MySqlCommand query = connection.CreateCommand();
            query.CommandText = "SELECT * from person";

            try
            {
                connection.Open();
            }
            catch (MySqlException ex)
            {
                return BadRequest(ex);
            }

            MySqlDataReader reader = query.ExecuteReader();

            var data = new LinkedList<Person>();
            while (reader.Read())
            {
                Person pr = new Person();
                pr.id = Int32.Parse(reader[0].ToString());
                pr.name = reader[1].ToString();
                pr.cui = reader[2].ToString();
                pr.balance = double.Parse(reader[3].ToString());
                pr.image = reader[4].ToString();
                data.AddLast(pr);
            }
            connection.Close();
            return Ok(data);
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            MySqlConnection connection = conn();
            try
            {
                connection.Open();
            }
            catch (MySqlException ex)
            {
                return BadRequest(ex);
            }

            var sql = "SELECT * FROM person WHERE person_id=@id";
            var query = new MySqlCommand(sql, connection);

            query.Parameters.AddWithValue("@id", id);
            query.Prepare();

            MySqlDataReader reader = query.ExecuteReader();

            Person pr = null;
            while (reader.Read())
            {
                pr = new Person();
                pr.id = Int32.Parse(reader[0].ToString());
                pr.name = reader[1].ToString();
                pr.cui = reader[2].ToString();
                pr.balance = double.Parse(reader[3].ToString());
                pr.image = reader[4].ToString();
            }

            connection.Close();
            if (!(pr is null))
                return Ok(pr);
            else
                return BadRequest();
        }

        // POST api/values
        [HttpPost]
        public IActionResult Post([FromBody] Person incomingValue)
        {
            
            MySqlConnection connection = conn();
            try
            {
                connection.Open();
            }
            catch (MySqlException ex)
            {
                return BadRequest(ex);
            }

            var sql = "INSERT INTO person(person_name, person_cui, person_image, person_balance) " +
                "VALUES(@name, @cui, @image, @balance)";
            var query = new MySqlCommand(sql, connection);

            query.Parameters.AddWithValue("@name", incomingValue.name);
            query.Parameters.AddWithValue("@cui", incomingValue.cui);
            query.Parameters.AddWithValue("@balance", incomingValue.balance);
            query.Parameters.AddWithValue("@image", incomingValue.image);
            query.Prepare();

            query.ExecuteNonQuery();
            connection.Close();
            return Ok(JsonConvert.SerializeObject("Person has been inserted!"));
        }

        // PUT api/values/5
        [EnableCors(origins: "*", headers: "*", methods: "*")]
        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody] Person incomingValue)
        {

            MySqlConnection connection = conn();
            try
            {
                connection.Open();
            }
            catch (MySqlException ex)
            {
                return BadRequest(ex);
            }

            var sql = "UPDATE person SET person_name=@name, person_cui=@cui, person_image=@image, person_balance=@balance" +
                      " WHERE person_id=@id";
            var query = new MySqlCommand(sql, connection);

            query.Parameters.AddWithValue("@name", incomingValue.name);
            query.Parameters.AddWithValue("@cui", incomingValue.cui);
            query.Parameters.AddWithValue("@balance", incomingValue.balance);
            query.Parameters.AddWithValue("@image", incomingValue.image);
            query.Parameters.AddWithValue("@id", incomingValue.id);
            query.Prepare();

            query.ExecuteNonQuery();
            connection.Close();
            return Ok(JsonConvert.SerializeObject("Person has been updated!"));
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            MySqlConnection connection = conn();
            try
            {
                connection.Open();
            }
            catch (MySqlException ex)
            {
                return BadRequest(ex);
            }

            var sql = "DELETE FROM person WHERE person_id=@id";
            var query = new MySqlCommand(sql, connection);

            query.Parameters.AddWithValue("@id", id);
            query.Prepare();

            var result = query.ExecuteNonQuery();
            connection.Close();
            return Ok(result);
        }
    }
}
