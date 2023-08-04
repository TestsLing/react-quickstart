//SPDX-License-Identifier: Unlicense
pragma solidity ^ 0.8.0;

import "hardhat/console.sol";

contract Comments {
    struct Comment {
        uint32 id;
        string topic;
        address creator_address;
        string message;
        uint created_at;
    }

    uint32 private idCounter;
    mapping(string => Comment[]) private commentsByTopic;
    mapping(uint32 => string) private topicById;

    event CommentAdded(Comment comment);

    function getComments(string calldata topic) public view returns(Comment[] memory) {
        return commentsByTopic[topic];
    }

    function addComment(string calldata topic, string calldata message) public {
        Comment memory comment = Comment({
            id: idCounter,
            topic: topic,
            creator_address: msg.sender,
            message: message,
            created_at: block.timestamp
        });
        commentsByTopic[topic].push(comment);
        topicById[idCounter] = topic;
        idCounter++;
        emit CommentAdded(comment);
    }

    function getAllComments() public view returns (Comment[][] memory) {
        Comment[][] memory allComments = new Comment[][](idCounter);
        uint32 index = 0;
        for(uint32 i = 0; i < idCounter; i++) {
            string memory topic = topicById[i];
            if(commentsByTopic[topic].length > 0) {
                allComments[index] = commentsByTopic[topic];
                index++;
            }
        }
        return allComments;
    }
}
