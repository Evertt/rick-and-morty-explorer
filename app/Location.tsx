import { LocationFragment } from "./data/docs-and-frags"
import { FragmentType, useFragment } from "./gql/fragment-masking"

const Location = (props: {
  location: FragmentType<typeof LocationFragment>
}) => {
  const location = useFragment(LocationFragment, props.location)
  return (
    <div>
      <h3 className="text-lg font-bold">Name: {location.name}</h3>
      <p>Dimension: {location.dimension}</p>
    </div>
  )
}

export default Location
