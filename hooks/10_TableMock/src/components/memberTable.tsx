import * as React from 'react';
import { MemberEntity } from '../model/member';
import { getMembersCollection } from '../api/memberApi';

const useMemberCollection = () => {
    const [memberCollection, setMemberCollection] = React.useState<
        MemberEntity[]
    >([]);

    const loadMemberCollection = () => {
        getMembersCollection().then((memberCollection) =>
            setMemberCollection(memberCollection)
        );
    };

    return { memberCollection, loadMemberCollection };
};

export const MemberTableComponent = () => {
    const { memberCollection, loadMemberCollection } = useMemberCollection();

    React.useEffect(() => {
        loadMemberCollection();
    }, []);

    return (
        <>
            <table>
                <thead>
                    <tr>
                        <th>Avatar</th>
                        <th>Id</th>
                        <th>Name</th>
                    </tr>
                </thead>
                <tbody>
                    {memberCollection.map((member) => (
                        <MemberRow key={member.id} members={member} />
                    ))}
                </tbody>
            </table>
        </>
    );
};

const MemberRow = ({ members }: { members: MemberEntity }) => (
    <tr>
        <td>
            <img src={members.avatar_url} style={{ maxWidth: '10rem' }} />
        </td>
        <td>
            <span>{members.id}</span>
        </td>
        <td>
            <span>{members.login}</span>
        </td>
    </tr>
);
