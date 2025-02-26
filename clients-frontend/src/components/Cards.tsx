function Cards() {
  return (
    <>
      <div className="card bg-base-100 w-96 shadow-sm ">
        <figure>
          <img
            src="https://static.vecteezy.com/system/resources/previews/040/815/487/non_2x/client-icon-in-logotype-vector.jpg"
            alt="Shoes"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">Clientes</h2>
          <p>
            A card component has a figure, a body part, and inside body there
            are title and actions parts
          </p>
          <div className="card-actions justify-end">
            <button className="btn btn-primary">Ingresar</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Cards;


