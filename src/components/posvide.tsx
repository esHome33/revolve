
type Props = {
    position: string | undefined;
}

const PosvideAfficheur = (props: Props) => {
    if (!props.position) {
        return null;
    }
    return (
        <div className="text-xs pb-2">vide en [{props.position}]</div>
    )
}

export default PosvideAfficheur